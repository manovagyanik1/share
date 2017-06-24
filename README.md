# share

# How the db would look like

user
-  id
- name

group
- id
- name
- list of users


group-edit
- id
- structure_id
- timestamp


structure
- id
- type, enum of (pencil, eraser, line)
- list of coordinates

line should have only 2 coordinates. <br/>
pencil, eraser should have list of coordinates.

