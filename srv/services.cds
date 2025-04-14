using poetryvault from '../db/schema';

service PoetryService {
  entity Poets  as projection on poetryvault.Poet;
  entity Poems  as projection on poetryvault.Poem;
  entity Genres as projection on poetryvault.Genre;
  entity Prose  as projection on poetryvault.Prose;
}
