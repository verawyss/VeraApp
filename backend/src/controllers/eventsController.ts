import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { supabase } from '../config/supabase';

export const getAllEvents = async (req: AuthRequest, res: Response) => {
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select(`
        *,
        attendances (
          id,
          user_id,
          status,
          additional_players,
          comment,
          users (id, name),
          equipment (id, type)
        )
      `)
      .order('date', { ascending: true });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch events' });
    }

    // Calculate total participants for each event
    const eventsWithTotals = events.map((event: any) => {
      const confirmedAttendances = event.attendances.filter(
        (a: any) => a.status === 'confirmed'
      );
      const totalParticipants = confirmedAttendances.reduce(
        (sum: number, a: any) => sum + 1 + (a.additional_players || 0),
        0
      );

      return {
        ...event,
        total_participants: totalParticipants,
      };
    });

    res.json({ events: eventsWithTotals });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, date, time_from, time_to, location } = req.body;

    if (!title || !date || !time_from || !time_to || !location) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const { data: event, error } = await supabase
      .from('events')
      .insert([
        {
          title,
          date,
          time_from,
          time_to,
          location,
          created_by: req.user?.id,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to create event' });
    }

    res.status(201).json({ event });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { eventId } = req.params;
    const { title, date, time_from, time_to, location } = req.body;

    const updateData: any = { updated_at: new Date().toISOString() };
    if (title) updateData.title = title;
    if (date) updateData.date = date;
    if (time_from) updateData.time_from = time_from;
    if (time_to) updateData.time_to = time_to;
    if (location) updateData.location = location;

    const { data: event, error } = await supabase
      .from('events')
      .update(updateData)
      .eq('id', eventId)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to update event' });
    }

    res.json({ event });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { eventId } = req.params;

    const { error } = await supabase.from('events').delete().eq('id', eventId);

    if (error) {
      return res.status(500).json({ error: 'Failed to delete event' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getEventEquipment = async (req: AuthRequest, res: Response) => {
  try {
    const { eventId } = req.params;

    const { data: attendances, error } = await supabase
      .from('attendances')
      .select(`
        id,
        user_id,
        users (name),
        equipment (id, type)
      `)
      .eq('event_id', eventId)
      .eq('status', 'confirmed');

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch equipment' });
    }

    // Group equipment by type
    const equipmentSummary = attendances.reduce((acc: any, attendance: any) => {
      attendance.equipment.forEach((eq: any) => {
        if (!acc[eq.type]) {
          acc[eq.type] = [];
        }
        acc[eq.type].push({
          user_name: attendance.users.name,
          user_id: attendance.user_id,
        });
      });
      return acc;
    }, {});

    res.json({ equipment: equipmentSummary });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
