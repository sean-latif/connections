# Connec-seans v1: Dr. No
As a fun learning opportunity and a potential resume builder, I'd like to program the New York Times game Connections.
The plan is to iterate on it in a way that helps me learn different technologies that I don't use often or at all.

Planned iterations (subject to change):
1. Copy what I can from New York Times and just get the board working.
2. Make the new "Game Creator"
3. Host the game on the actual real life internet (very devops-y).
4. Convert what I have to React JS.
5. Add a back-end layer with Python so that the user can't cheat through the browser tools.
6. Store game data (boards, submissions, etc.) in some data store. Thinking DynamoDB or Valkey/Redis.
7. Users could share links to boards that they have created.
8. Introduce AI assistant to it and myself. When a user is creating a game, it can suggest items.
9. AI assistant can provide suggestions during a game.
10. I'll be super impressed if I get this far so we'll see what happens after.

Updates:
- This is the 1st rough draft. All of the styling was copied from the official Connections site. Right now it is pure, basic, raw HTML + Javascript.

Known bugs:
- "One away..." appears if the guess is 2 away