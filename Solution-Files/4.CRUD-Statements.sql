/*
	File contains crud - statatements
*/
-- Add entry for Drew Iorio
INSERT [dbo].[Players] ([Id], [Rank], [PlayerName], [AgeThatYear], [Hits], [Year], [Bats]) VALUES (535, 535, N'Drew Iorio', 30, 262, 2004, N'L');

-- Update the number of hits 
Update
	Players
set
	Hits = 263
where 
	PlayerName = N'Drew Iorio';


--  Expecting to see the last 35 entries
select [Rank], [PlayerName], [AgeThatYear], [Hits], [Year], [Bats]
	from Players
		where id > 500;

-- Delete the last record created for Drew Iorio
delete from Players 
	where id = 535;