use Baseball
go

--drop table Players;

if( select count(1)
	from sys.tables
		where name = 'Players') = 0
	begin

	print 'Adding table Players to baseball database'

	CREATE TABLE Players (
		Id  INT not null PRIMARY KEY,
		[Rank] INT  NULL,
		PlayerName VARCHAR(255) NOT NULL,
		AgeThatYear INT ,
		Hits INT NOT NULL,
		Year INT NOT NULL,
		Bats CHAR(1) NOT NULL
	);
	end
else 
	begin 
	print 'Table Players Already Exists'
	end

