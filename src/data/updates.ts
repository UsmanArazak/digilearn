export interface UpdateItem {
  id: string;
  version: string;
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
    id: 'u3',
    version: 'v1.2',
    date: '2026-04-10',
    titleKey: 'updates.items.u3.title',
    descriptionKey: 'updates.items.u3.description',
  },
  {
    id: 'u2',
    version: 'v1.1',
    date: '2026-03-20',
    titleKey: 'updates.items.u2.title',
    descriptionKey: 'updates.items.u2.description',
  },
  {
    id: 'u1',
    version: 'v1.0',
    date: '2026-03-01',
    titleKey: 'updates.items.u1.title',
    descriptionKey: 'updates.items.u1.description',
  },
];

export const COMING_SOON: ComingSoonItem[] = [
  {
    id: 'c1',
    titleKey: 'updates.coming_soon.c1.title',
    descriptionKey: 'updates.coming_soon.c1.description',
    badgeKey: 'updates.badges.coming_soon',
  },
  {
    id: 'c2',
    titleKey: 'updates.coming_soon.c2.title',
    descriptionKey: 'updates.coming_soon.c2.description',
    badgeKey: 'updates.badges.coming_soon',
  },
  {
    id: 'c3',
    titleKey: 'updates.coming_soon.c3.title',
    descriptionKey: 'updates.coming_soon.c3.description',
    badgeKey: 'updates.badges.coming_soon',
  },
];

export const LATEST_UPDATE_VERSION = UPDATES[0]?.version ?? '';
