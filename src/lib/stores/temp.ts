

export const addSystem = async (name: string, description: string = '', user_id: string) => {
  const { data, error } = await supabase
    .from('systems')
    .insert([newSystem(name, description, user_id)]);

  if (error) {
    return console.error(error);
  }

  systems.update($systems => [...$systems, { ...data[0], stories: [] }]);
}





