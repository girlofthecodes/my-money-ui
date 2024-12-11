# APLICACION PARA EL MANEJO DE TUS FINANZAS

Aplicación desarrollada y diseñaada para una educación financiera y un manejo más detallado de las finanzas el cliente, siendo asi, desde el uso de sus propias cuentas, registrando sus diferentes ingresos y egresos que el cliente quiera contemplar para contemplar en su saldo total disponible, asi como propuestas de ahorro y un estimado de cuento deberia de ahorrar para cumplir alguna meta definida. 
Esta aplicación consume la API desarrollada con DRF, a través desde sus endpoints para que de esa forma se vaya almacenando los datos en la base de datos, la cual en este caso, nuestro servidor esta manejando PostgreSQL. 
Se han desarrollado las funcionalidades de autenticación básicas para el manejo de una aplicación como lo son: signup, login, logout, change password y reset password. 
Asi como el uso de Token JWT para la parte de autenticación teniendo en cuenta Tokens Access y Token Refresh donde la parte del cliente es manipulandolo para cumplir su función esperada. 
Por otra parte funcionalidades como registro de tarjeta, listado de ingresos y egresos a partir de los que el usuario haya registrado, asi como calculos de porcentajes que eso implica en el saldo total de la cuenta. 
Asi como también se pueden listar dependiendo de la cuenta, ingreso o egreso que se quiera manejar. Se consumen del servidor tanto metodos CREATE, PATCH, GET Y DELETE. Por tal como se menciono, tambien es posible la eliminación de cuenntas, ingresos y egresos. 
A continuación se mostrara un avance de lo que es el sitio web: 
- AUTENTICACIÓN:
  
  auth/signup
  ![image](https://github.com/user-attachments/assets/dcaf964c-9537-4ee1-b0ca-903f3104203f)
  auth/login
  ![image](https://github.com/user-attachments/assets/8b098eb3-245a-43bb-9281-b67fb9a8817c)
  auth/reset-password
  
  ![image](https://github.com/user-attachments/assets/4941944f-764a-4cf5-91f5-0119d16396f6)
  
  auth/change-password
  
  ![image](https://github.com/user-attachments/assets/0f4025fe-59f2-4b6a-afc0-e96b8dd7b26d)
  ![image](https://github.com/user-attachments/assets/be2ce0d0-6528-48cb-abfe-01dc6f1bac01)

- CUENTAS, INGRESOS Y EGRESOS
- 
  /account
  ![image](https://github.com/user-attachments/assets/a2564d20-3442-4d9b-82e6-d36313a609d9)
  ![image](https://github.com/user-attachments/assets/de0f493d-266c-4b3b-ae5b-b49de6d5451f)

  /account/cards
  ![image](https://github.com/user-attachments/assets/1b2f0491-42f8-4263-93e8-0292bffcce4b)
  ![image](https://github.com/user-attachments/assets/c3d93154-ba50-4b61-bb2d-fb9d9a847d00)
  ![image](https://github.com/user-attachments/assets/9fed4174-9784-4b78-aa82-19db52580444)
  ![image](https://github.com/user-attachments/assets/810c74a1-9053-42fc-934a-4416ab32b3c9)

  /account/cards/register
  ![image](https://github.com/user-attachments/assets/42abdf28-13cf-4f2f-89fe-896658170991)
  ![image](https://github.com/user-attachments/assets/8e7b0db9-e2a8-4efb-a126-0dd4f105cf5b)





  





