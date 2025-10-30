import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { supabase } from '../config/supabase';

export const createOrUpdateAttendance = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { eventId } = req.params;
    const { status, additional_players, comment, equipment } = req.body;

    if (!status || !['confirmed', 'declined'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const userId = req.user?.id;

    // Check if attendance already exists
    const { data: existingAttendance } = await supabase
      .from('attendances')
      .select('id')
      .eq('user_id', userId)
      .eq('event_id', eventId)
      .single();

    let attendanceId: string;

    if (existingAttendance) {
      // Update existing attendance
      const { data: updatedAttendance, error } = await supabase
        .from('attendances')
        .update({
          status,
          additional_players: additional_players || 0,
          comment: comment || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingAttendance.id)
        .select()
        .single();

      if (error) {
        return res.status(500).json({ error: 'Failed to update attendance' });
      }

      attendanceId = updatedAttendance.id;

      // Delete existing equipment
      await supabase
        .from('equipment')
        .delete()
        .eq('attendance_id', attendanceId);
    } else {
      // Create new attendance
      const { data: newAttendance, error } = await supabase
        .from('attendances')
        .insert([
          {
            user_id: userId,
            event_id: eventId,
            status,
            additional_players: additional_players || 0,
            comment: comment || null,
          },
        ])
        .select()
        .single();

      if (error) {
        return res.status(500).json({ error: 'Failed to create attendance' });
      }

      attendanceId = newAttendance.id;
    }

    // Add equipment if status is confirmed and equipment is provided
    if (status === 'confirmed' && equipment && equipment.length > 0) {
      const equipmentData = equipment.map((type: string) => ({
        attendance_id: attendanceId,
        type,
      }));

      await supabase.from('equipment').insert(equipmentData);
    }

    // Fetch updated attendance with relations
    const { data: attendance, error: fetchError } = await supabase
      .from('attendances')
      .select(`
        *,
        users (id, name),
        equipment (id, type)
      `)
      .eq('id', attendanceId)
      .single();

    if (fetchError) {
      return res.status(500).json({ error: 'Failed to fetch attendance' });
    }

    res.json({ attendance });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const { eventId } = req.params;
    const userId = req.user?.id;

    const { error } = await supabase
      .from('attendances')
      .delete()
      .eq('user_id', userId)
      .eq('event_id', eventId);

    if (error) {
      return res.status(500).json({ error: 'Failed to delete attendance' });
    }

    res.json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
