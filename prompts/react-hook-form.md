I want you to create a new page under /create-host url that have the following form structure:

{
"Host ID": {
"type": "text",
"max": 3,
"format": "Starts with 1",
"required": true
},
"Name": {
"type": "text",
"format": "It should include first and last name by checking if there's a space between two texts",
"required": true
},
"Host Fields": {
"type": "select",
"required": true,
"options": [
{
"label": "Politics",
"value": "POLITICS"
},
{
"label": "History",
"value": "HISTORY"
},
{
"label": "Diplomacy",
"value": "DIPLOMACY"
}
]
},
"Salary": {
"type": "number",
},
"Number of episodes per week": {
"type": "radio",
"required": true,
"options": [
{
"label": "1",
"value": 1
},{
"label": "2",
"value": 2
}
,{
"label": "3",
"value": 3
}
]
}
}
