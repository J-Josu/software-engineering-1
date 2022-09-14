export interface Systems {
  id: string   /* primary key */;
  user_id: string;
  slug: string;
  name: string;
  description: string;
};

export interface Stories {
  id: string   /* primary key */;
  user_id: string;
  slug: string;
  id_custom: string;
  description: string;
  color: string;
  system_id: string   /* foreign key to systems.id */;
  systems?: Systems;
};

export interface Scenaries {
  id: string   /* primary key */;
  user_id: string;
  storie_id: string   /* foreign key to stories.id */;
  title: string;
  context: string;
  event: string;
  response: string;
  stories?: Stories;
};

export interface Rules {
  id: string   /* primary key */;
  storie_id: string   /* foreign key to stories.id */;
  description: string;
  user_id: string;
  stories?: Stories;
};
