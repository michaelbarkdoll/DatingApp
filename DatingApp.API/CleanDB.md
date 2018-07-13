# How to clean launch new pull from GitHub
````
dotnet restore
````

Create a new .db file, then put values in it
````
dotnet ef database update
````

````
cd DatingAPP.API
dotnet watch run
````

````
npm install -g @angular/cli@1.7.4
cd DatingAPP.SPA
npm install
ng serve
````


## these will likely install with npm install when we clone and get ready to ng serve in the previous step.
````
cd DatingApp\DatingApp.SPA
npm install bootstrap@3.3.7 --save
npm install font-awesome --save
````


## Launch in dotnet API in development mode:
````
$ echo $ASPNETCORE_ENVIRONMENT

$ export ASPNETCORE_ENVIRONMENT="Development"
$ echo $ASPNETCORE_ENVIRONMENT
Development
cisadmin@asura:~/DatingApp/DatingApp.API$
````

````
$Env:ASPNETCORE_ENVIRONMENT="Development"
````


# ngx-gallery install:


Error:
````
ERROR in ./src/app/members/member-detail/member-detail.component.ts
Module not found: Error: Can't resolve '../../../../node_modules/ngx-gallery' in '/home/cisadmin/DatingApp/DatingApp.SPA/src/app/members/member-detail'
ERROR in ./src/app/app.module.ts
Module not found: Error: Can't resolve 'ngx-gallery' in '/home/cisadmin/DatingApp/DatingApp.SPA/src/app'

webpack: Failed to compile.
ERROR in src/app/app.module.ts(25,34): error TS2307: Cannot find module 'ngx-gallery'.
src/app/members/member-detail/member-detail.component.ts(6,73): error TS2307: Cannot find module '../../../../node_modules/ngx-gallery'.

Was previously installed with:
npm install ngx-gallery --save
````

````
cd DatingApp.SPA
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

/home/cisadmin/DatingApp/DatingApp.API/Startup.cs
````
            // seeder.SeedUsers();
````