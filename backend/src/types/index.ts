export interface User {
  id: string;
  email: string;
  name: string;
  is_admin: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time_from: string;
  time_to: string;
  location: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Attendance {
  id: string;
  user_id: string;
  event_id: string;
  status: 'confirmed' | 'declined';
  additional_players: number;
  comment?: string;
  created_at: string;
  updated_at: string;
}

export interface Equipment {
  id: string;
  attendance_id: string;
  type: 'ball' | 'pump' | 'overboots';
  created_at: string;
}

export interface AttendanceWithDetails extends Attendance {
  user: Pick<User, 'id' | 'name'>;
  equipment: Equipment[];
}

export interface EventWithAttendance extends Event {
  attendances: AttendanceWithDetails[];
  total_participants: number;
}
