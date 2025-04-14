namespace poetryvault;

entity Poet {
  key ID    : UUID;
      name  : String(100);
      bio   : LargeString;
      dob   : Date;
      image : String;
}

entity Genre {
  key ID   : UUID;
      name : String(50);
}

entity Poem {
  key ID        : UUID;
      title     : String(150);
      content   : LargeString;
      date      : Date;
      tags      : String;
      poet      : Association to Poet;
      genre     : Association to Genre;
}

entity Prose {
  key ID        : UUID;
      title     : String(150);
      content   : LargeString;
      type      : String enum { Essay; ShortStory; Memoir; Other; };
      date      : Date;
      tags      : String;
      poet      : Association to Poet;
      genre     : Association to Genre;
}
