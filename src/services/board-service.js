class BoardService {    
    static createBoard(board) {
        return BoardRepository.createBoard(board);
    }
    
    static getBoardItems(boardId) {
        const items = [];
        const board = BoardRepository.getConnectionsBoard(boardId);
        board.Groups.forEach(group => {
            group.Items.forEach((item) => {
                items.push(item);
            });
        });
        return items;
    }

    static evaluateGuess(boardId, items) {
        const board = BoardRepository.getConnectionsBoard(boardId);
        const groupsByItem = {};
        board.Groups.forEach(group => {
            group.Items.forEach((item) => {
                groupsByItem[item.Label] = group;
            });
        });

        const selectedGroupCounts = {};
        items.forEach(item => {
            selectedGroupCounts[groupsByItem[item].GroupId] = selectedGroupCounts[groupsByItem[item].GroupId] == null ?
                1 :
                selectedGroupCounts[groupsByItem[item].GroupId] + 1;
        });
        const isSuccess = Object.keys(selectedGroupCounts).length === 1;
        return {
            isSuccess: isSuccess,
            group: isSuccess ? groupsByItem[items[0]] : null,
            message: Object.keys(selectedGroupCounts).filter(x => selectedGroupCounts[x] === 3).length ? 'One away...' : null
        };
    }

    static getGroupsByItem(boardId) {
        const board = BoardRepository.getConnectionsBoard(boardId);
        const groupsByItem = {};
        board.Groups.forEach(group => {
            group.Items.forEach((item) => {
                groupsByItem[item.Label] = group;
            });
        });

        return groupsByItem;
    }
}