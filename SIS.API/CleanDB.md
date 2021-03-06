# How to clean launch new pull from GitHub
````
dotnet restore
````

Create a new .db file, then put values in it
````
dotnet ef database update
````

````
cd SIS.API
dotnet watch run
````

````
npm install -g @angular/cli@1.7.4
cd SIS.SPA
npm install
ng serve
````


## these will likely install with npm install when we clone and get ready to ng serve in the previous step.
````
cd SIS\SIS.SPA
npm install bootstrap@3.3.7 --save
npm install font-awesome --save
````


## Launch in dotnet API in development mode:
````
$ echo $ASPNETCORE_ENVIRONMENT

$ export ASPNETCORE_ENVIRONMENT="Development"
$ echo $ASPNETCORE_ENVIRONMENT
Development
cisadmin@asura:~/SIS/SIS.API$
````

````
$Env:ASPNETCORE_ENVIRONMENT="Development"
````


# ngx-gallery install:


Error:
````
ERROR in ./src/app/members/member-detail/member-detail.component.ts
Module not found: Error: Can't resolve '../../../../node_modules/ngx-gallery' in '/home/cisadmin/SIS/SIS.SPA/src/app/members/member-detail'
ERROR in ./src/app/app.module.ts
Module not found: Error: Can't resolve 'ngx-gallery' in '/home/cisadmin/SIS/SIS.SPA/src/app'

webpack: Failed to compile.
ERROR in src/app/app.module.ts(25,34): error TS2307: Cannot find module 'ngx-gallery'.
src/app/members/member-detail/member-detail.component.ts(6,73): error TS2307: Cannot find module '../../../../node_modules/ngx-gallery'.

Was previously installed with:
npm install ngx-gallery --save
````

````
cd SIS.SPA
npm install
````

````
dotnet restore
````

EF update:
````
$ dotnet ef migrations list
20180629184155_InitialCreate
20180703002225_AddedUserModel
20180706233517_ExtendedUserClass
````

Drop the db 
````
dotnet ef database drop
````

Recreate the database migrations:
````
dotnet ef database update
````

````
Applying migration '20180629184155_InitialCreate'.
Applying migration '20180703002225_AddedUserModel'.
Applying migration '20180706233517_ExtendedUserClass'.
Done.
````


Uncomment and run `dotnet watch run`

/home/cisadmin/SIS/SIS.API/Startup.cs
````
            // seeder.SeedUsers();
````

ASP.NET API:
Nuget Package:
CloudinaryDotNet
version 1.3.1

````
npm install ng2-file-upload --save
````

Install underscore:
````
npm install underscore --save
````

We'll also install the following for strong typing with underscore:
````
npm install @types/underscore --save-dev
````

Now make use of this in our component

Changed name of App to SIS. 07/16/2018

````
npm install time-ago-pipe --save
````





Don't use the following:
````
npm uninstall file-saver ngx-filesaver --save
````

Instead use:
````
npm install file-saver
npm install @types/file-saver --save-dev
````

````
import { saveAs } from 'file-saver';

this.authHttp.get('http://localhost:5000/api/users/download/a.png', options).subscribe(res => {
      saveAs((<any>res)._body);
    });
````

https://github.com/eligrey/FileSaver.js

````
dotnet ef migrations add "ExtendUser"
dotnet ef database update
````




https://www.json-generator.com/

````
[
  '{{repeat(99)}}',
  {
    Username: '{{firstName("female")}}',
    FirstName: '{{firstName("female")}}',
    LastName: '{{surname()}}',
    DawgTag: function(num) {
      return num.integer(850000000,859999999);
    },
    Gender: 'female',
    DateOfBirth: '{{date(new Date(1950,0,1), new Date(1999, 11, 31), "YYYY-MM-dd")}}',
    Password: 'password',
    KnownAs: function(){ return this.Username; },
    Created: '{{date(new Date(2017,0,1), new Date(2017, 7, 31), "YYYY-MM-dd")}}',
    LastActive: function(){return this.DateCreated; },
    Introduction: '{{lorem(1, "paragraphs")}}',
    LookingFor: '{{lorem(1, "paragraphs")}}',
    Interests: '{{lorem(1, "sentences")}}',
    Address1: '{{integer(100, 999)}} {{street()}}',
    City: '{{city()}}',
    Country: '{{country()}}',
    MasterThesisTitle: '{{lorem(1, "sentences")}}',
    Photos: [
        {
          url: function(num) {
          return 'https://randomuser.me/api/portraits/women/' + num.integer(1,99) + '.jpg';
        },
        isMain: true,
        description: '{{lorem()}}'
      }
    ]
  }
]
````


````
[
  '{{repeat(99)}}',
  {
    Username: '{{firstName("male")}}',
    FirstName: '{{firstName("male")}}',
    LastName: '{{surname()}}',
    DawgTag: function(num) {
      return num.integer(850000000,859999999);
    },
    Gender: 'male',
    DateOfBirth: '{{date(new Date(1950,0,1), new Date(1999, 11, 31), "YYYY-MM-dd")}}',
    Password: 'password',
    KnownAs: function(){ return this.Username; },
    Created: '{{date(new Date(2017,0,1), new Date(2017, 7, 31), "YYYY-MM-dd")}}',
    LastActive: function(){return this.DateCreated; },
    Introduction: '{{lorem(1, "paragraphs")}}',
    LookingFor: '{{lorem(1, "paragraphs")}}',
    Interests: '{{lorem(1, "sentences")}}',
    Address1: '{{integer(100, 999)}} {{street()}}',
    City: '{{city()}}',
    Country: '{{country()}}',
    MasterThesisTitle: '{{lorem(1, "sentences")}}',
    Photos: [
        {
          url: function(num) {
          return 'https://randomuser.me/api/portraits/men/' + num.integer(1,99) + '.jpg';
        },
        isMain: true,
        description: '{{lorem()}}'
      }
    ]
  }
]
````