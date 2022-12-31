export const getRoundWinner = (moves: any): string => {
	return moves[0].selectedNumber > moves[1].selectedNumber ? moves[0].user_id : moves[1].user_id;
};
