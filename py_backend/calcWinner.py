from numpy import *
def calcWinner(board,row,col,nrow,ncol):
    dir_key=array([[ 1, 0],
                   [ 1, 1],
                   [ 0, 1],
                   [-1,-1]])
    steps=arange(4)
    aWin=False
    for i in range(4):
        for j in range(4):
            row4=dir_key[i,0]*(steps-j)+row
            col4=dir_key[i,1]*(steps-j)+col
            if min((row4)>=0) & (max(row4)<nrow) & (min(col4)>=0) & (max(col4)<ncol):
                if all(board[row4[:],col4[:]]==board[row,col]):
                    aWin=True
                    return aWin, row4,col4
    return aWin, [], []

if __name__=='__main__':
    board=array([[0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0],
                 [2, 0, 1, 0, 0, 0, 0],
                 [1, 0, 1, 0, 0, 2, 2],
                 [1, 1, 2, 2, 2, 2, 1],
                 [2, 2, 1, 1, 2, 1, 1]])
    row=4
    col=3
    nrow=6
    ncol=7
    aWin,win_row,win_col=calcWinner(board,row,col,nrow,ncol)
    print(board)
    board[win_row[:],win_col[:]]=4
    board[row,col]=5
    print(aWin)
    print(win_col)
    print(win_row)
    print(board)
