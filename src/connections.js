document.addEventListener('DOMContentLoaded', () => {
    const boardId = new URLSearchParams(window.location.search).get('boardId');
    startBoardGame(boardId);
});

document.addEventListener('board-created', (event) => {
    startBoardGame(event.detail.boardId);
});

function startBoardGame(boardId) {
    const gameCreator = document.querySelector('sl-game-creator');
    const game = document.querySelector('sl-game');
    if (boardId) {
        gameCreator.style.display = 'none';
        game.setAttribute('board-id', boardId);
        game.style.display = 'block';
        return;
    }

    game.style.display = 'none';
}