let board = []
let stack = []

const resetBoard = () => {
    for (let i = 0; i < 35; i++) {
        board.push([])
        for (let j = 0; j < 65; j++) {
            board[i][j] = 0
        }
    }
}
resetBoard()

function updateDataBFS(board, start, ans, stack) {
    const rows = board.length
    const cols = board[0].length

    if (stack.length < 1) {
        stack.push(start)
    }

    board[ans[0]][ans[1]] = 2

    function bfs(board, r, c) {
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
            if (board[r][c] === 2) {
                console.log('found it')
                while (stack.length > 0) {
                    stack.pop()
                }
                return
            } else if (board[r][c] === 0) {
                board[r][c] = 1
                stack.push([r + 1, c])
                stack.push([r - 1, c])
                stack.push([r, c + 1])
                stack.push([r, c - 1])
            }
        }
    }
    temp = stack[0]
    stack.splice(0, 1)

    bfs(board, temp[0], temp[1])
};

function updateDataDFS(board, start, ans, stack) {

    if (stack.length < 1) {
        stack.push(start)
    }

    board[ans[0]][ans[1]] = 2
    const rows = board.length
    const cols = board[0].length

    function dfs(board, r, c) {
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
            if (board[r][c] === 2) {
                console.log('found it')
                while (stack.length > 0) {
                    stack.pop()
                }
                return
            } else if (board[r][c] === 0) {
                board[r][c] = 1
                stack.push([r + 1, c])
                stack.push([r - 1, c])
                stack.push([r, c + 1])
                stack.push([r, c - 1])
            }
        }
    }

    temp = stack.pop()
    dfs(board, temp[0], temp[1])
};

function updateUI() {

    const clearBoard = (() => {
        const nodes = document.querySelectorAll('.cell');
        const container = document.querySelector('.game-of-life');

        nodes.forEach((node) => {
            node.parentNode.removeChild(node);
        })

    })();

    const displayBoard = (() => {
        const container = document.querySelector('.game-of-life');
        const rows = board.length
        const cols = board[0].length

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell')
                cell.setAttribute('x', j)
                cell.setAttribute('y', i)

                if (board[i][j] === 1) {
                    cell.classList.add('seen')
                }
                if (board[i][j] === 0) {
                    cell.classList.add('unseen')
                }
                if (board[i][j] === 2) {
                    cell.classList.add('target')
                }

                container.appendChild(cell)
            }
        }
    })();
}

function runDFS() {
    updateUI()
    const cells = document.querySelectorAll('.cell')
    startParams = []

    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            const x = cell.getAttribute('x')
            const y = cell.getAttribute('y')

            startParams.unshift([Number(y), Number(x)])
            cell.setAttribute('style', 'border: 1px solid white;')

            if (startParams.length === 2) {
                animateDFS(startParams[1], startParams[0])
            }
        })
    })

    function animateDFS(start, ans) {
        let animate = setInterval(() => {
            updateDataDFS(board, start, ans, stack);
            updateUI()

            if (stack.length < 1) {
                clearInterval(animate)
            }
        }, 3)
    }
}

function runBFS() {
    updateUI()
    const cells = document.querySelectorAll('.cell')
    startParams = []

    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            const x = cell.getAttribute('x')
            const y = cell.getAttribute('y')

            startParams.unshift([Number(y), Number(x)])
            cell.setAttribute('style', 'border: 1px solid white;')

            if (startParams.length === 2) {
                animateBFS(startParams[1], startParams[0])
            }
        })
    })

    function animateBFS(start, ans) {
        let animate = setInterval(() => {
            updateDataBFS(board, start, ans, stack);
            updateUI()

            if (stack.length < 1) {
                clearInterval(animate)
            }
        }, 3)
    }
}

const initDFS = document.querySelector('#initDFS')
initDFS.addEventListener('click', () => {
    board = []
    resetBoard()
    runDFS()
})

const initBFS = document.querySelector('#initBFS')
initBFS.addEventListener('click', () => {
    board = []
    resetBoard()
    runBFS()
})