document.addEventListener('DOMContentLoaded', () => {
    _boardId = new URLSearchParams(window.location.search).get('boardId') ?? 0;
    document.querySelector('sl-game').setAttribute('board-id', _boardId);
});