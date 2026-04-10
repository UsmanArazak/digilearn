export interface UpdateItem {
  id: string;
  date: string;
  titleKey: string;
  descriptionKey: string;
}

export interface ComingSoonItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  badgeKey: string;
}

export const UPDATES_LAST_SEEN_STORAGE_KEY = 'digilearn_last_seen_update';

export const UPDATES: UpdateItem[] = [
  {
    id: 'progress_tracking',
    date: 'April 2026',
    titleKey: 'updates.progress_tracking.title',
    descriptionKey: 'updates.progress_tracking.description',
  },
  {
    id: 'expanded_content',
    date: 'April 2026',
    titleKey: 'updates.expanded_content.title',
    descriptionKey: 'updates.expanded_content.description',
  },
  {
    id: 'updates_tab',
    date: 'April 2026',
    titleKey: 'updates.updates_tab.title',
    descriptionKey: 'updates.updates_tab.description',
  },
];

export const COMING_SOON: ComingSoonItem[] = [
  {
    id: 'languages',
    titleKey: 'coming_soon.languages.title',
    descriptionKey: 'coming_soon.languages.description',
    badgeKey: 'coming_soon.badge',
  },
  {
    id: 'recordings',
    titleKey: 'coming_soon.recordings.title',
    descriptionKey: 'coming_soon.recordings.description',
    badgeKey: 'coming_soon.badge',
  },
  {
    id: 'offline',
    titleKey: 'coming_soon.offline.title',
    descriptionKey: 'coming_soon.offline.description',
    badgeKey: 'coming_soon.badge',
  },
];

export const LATEST_UPDATE_ID = UPDATES[0]?.id ?? '';
