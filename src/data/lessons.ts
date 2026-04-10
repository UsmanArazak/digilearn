import {
  AlertTriangle,
  BatteryCharging,
  Download,
  Globe,
  KeyRound,
  LifeBuoy,
  Lock,
  LucideIcon,
  Mail,
  MessageCircle,
  MessageSquare,
  PhoneCall,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  UserPlus,
  Users,
  Wifi,
} from 'lucide-react';

export type CourseId = 'phone_basics' | 'internet_101' | 'email_messaging' | 'online_safety';

export interface LessonStep {
  headingKey: string;
  contentKey: string;
  icon: LucideIcon;
}

export interface Lesson {
  titleKey: string;
  readTimeMin: number;
  steps: LessonStep[];
}

const root = 'lesson_content';

const lesson = (courseId: CourseId, lessonNumber: number, readTimeMin: number, icons: LucideIcon[]): Lesson => ({
  titleKey: `${root}.${courseId}.lesson${lessonNumber}.title`,
  readTimeMin,
  steps: icons.map((icon, index) => ({
    headingKey: `${root}.${courseId}.lesson${lessonNumber}.steps.step${index + 1}.heading`,
    contentKey: `${root}.${courseId}.lesson${lessonNumber}.steps.step${index + 1}.content`,
    icon,
  })),
});

export const LESSONS_BY_COURSE: Record<CourseId, Lesson[]> = {
  phone_basics: [
    lesson('phone_basics', 1, 12, [Smartphone, BatteryCharging, MessageSquare, Search, Lock, ShieldCheck]),
    lesson('phone_basics', 2, 12, [PhoneCall, Smartphone, Users, UserPlus, Search, ShieldCheck]),
    lesson('phone_basics', 3, 12, [MessageSquare, Smartphone, Send, MessageCircle, ShieldCheck, AlertTriangle]),
    lesson('phone_basics', 4, 12, [Download, Search, ShieldCheck, Smartphone, Lock, AlertTriangle]),
    lesson('phone_basics', 5, 12, [BatteryCharging, Download, ShieldCheck, Smartphone, Search, Globe]),
  ],
  internet_101: [
    lesson('internet_101', 1, 10, [Globe, Users, Wifi, MessageSquare, ShieldCheck, LifeBuoy]),
    lesson('internet_101', 2, 10, [Wifi, Smartphone, Globe, Lock, Search, ShieldCheck]),
    lesson('internet_101', 3, 10, [Globe, Search, Lock, MessageSquare, KeyRound, ShieldCheck]),
    lesson('internet_101', 4, 10, [Search, Users, Globe, ShieldCheck, AlertTriangle, Smartphone]),
    lesson('internet_101', 5, 10, [ShieldCheck, Lock, AlertTriangle, Globe, LifeBuoy, KeyRound]),
  ],
  email_messaging: [
    lesson('email_messaging', 1, 4, [Mail, Send, MessageSquare]),
    lesson('email_messaging', 2, 5, [UserPlus, Lock, ShieldCheck]),
    lesson('email_messaging', 3, 4, [Send, Mail, Search]),
    lesson('email_messaging', 4, 4, [MessageCircle, Users, AlertTriangle]),
    lesson('email_messaging', 5, 4, [Lock, AlertTriangle, ShieldCheck]),
  ],
  online_safety: [
    lesson('online_safety', 1, 4, [ShieldCheck, Lock, Users]),
    lesson('online_safety', 2, 4, [AlertTriangle, MessageSquare, Search]),
    lesson('online_safety', 3, 4, [KeyRound, Lock, ShieldCheck]),
    lesson('online_safety', 4, 4, [Users, MessageCircle, AlertTriangle]),
    lesson('online_safety', 5, 3, [LifeBuoy, PhoneCall, ShieldCheck]),
  ],
};

export const COURSE_IDS: CourseId[] = ['phone_basics', 'internet_101', 'email_messaging', 'online_safety'];

export interface ProgressMap {
  [courseId: string]: number[];
}

export const PROGRESS_STORAGE_KEY = 'digilearn_progress';
