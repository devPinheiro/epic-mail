# epic-mail 
[![Build Status](https://travis-ci.org/devPinheiro/epic-mail.svg?branch=develop)](https://travis-ci.org/devPinheiro/epic-mail) 
[![Coverage Status](https://coveralls.io/repos/github/devPinheiro/epic-mail/badge.svg?branch=ch-fix-coveralls-integration-164479662)](https://coveralls.io/github/devPinheiro/epic-mail?branch=ch-fix-coveralls-integration-164479662) <a href="https://codeclimate.com/github/devPinheiro/epic-mail/maintainability"><img src="https://api.codeclimate.com/v1/badges/7cb0d211aa719f740fec/maintainability" /></a>


an email web app that helps people exchange messages/information over the internet.

#### Get Started
- After cloning the repo, cd into the root folder

- Install all necessary dependencies by running 

  ``npm install``

- Launch the node server with

  ``npm run dev``

- To run local tests using mocha
  
  ``npm run test``

###  UI View

![](epic.gif)


### API Endpoint
the working API endpoints

<table>

<tr>
   <th>HTTP Verb</th>
   <th>Endpoint</th>
   <th>Description</th>
</tr>

<tr>
   <td>POST</td>
   <td>/api/v1/auth/signup</td>
   <td>create user account</td>
</tr>

<tr>
   <td>POST</td>
   <td>/api/v1/auth/login</td>
   <td>sign in a user</td>
</tr>

<tr>
   <td>POST</td>
   <td>/api/v1/messages</td>
   <td>send amil to individuals</td>
</tr>

<tr>
   <td>GET</td>
   <td>/api/v1/messages</td>
   <td>fetch all received emails for a user</td>
</tr>

<tr>
   <td>GET</td>
   <td>/api/v1/messages/unread</td>
   <td>fetch all unread emails for a user</td>
</tr>

<tr>
   <td>GET</td>
   <td>/api/v1/messages/sent</td>
   <td>fetch all sent emails for a user</td>
</tr>

<tr>
   <td>GET</td>
   <td>/api/v1/messages/unread</td>
   <td>fetch all unread emails for a user</td>
</tr>

<tr>
   <td>GET</td>
   <td>/api/v1/messages/message-id</td>
   <td>fetch a specific user's email</td>
</tr>

<tr>
   <td>DELETE</td>
   <td>/api/v1/messages/message-id</td>
   <td>delete an email in a user's inbox</td>
</tr>

</table>