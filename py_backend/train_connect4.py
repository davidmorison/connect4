from numpy import *
from matplotlib.pyplot import *
#from calcWinner import calcWinner, sub2ind
def sub2ind(i,j,nrow,ncol):
    # I know nrow is not used, but this is easy to remember.
    # could error check?
    return j+i*ncol
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
                #ind=col4+row4*ncol
                ind=sub2ind(row4,col4,nrow,ncol)
                if all(board[row4[:],col4[:]]==board[row,col]):
                #if all(board.flatten()[ind]==board[row,col]):
                    aWin=True
                    return aWin, row4,col4
    return aWin, [], []
def pickMove(isXturn,board):
    openCol=(board[0,:]==0).nonzero()[0]
    if openCol.size==0:
        col=nan
        row=nan
    else:
        col=random.choice(openCol)
        row=sum(board[:,col]==0)-1
    return row,col

#if __name__=='_main_':
nrow=6
ncol=7
isXturn=True
playing=True
board=tile([0],[nrow,ncol])
while playing:
    row,col=pickMove(isXturn,board)
    if isfinite(row):
        if isXturn:
            board[row,col]=1
        else:
            board[row,col]=2
        aWin,win_row,win_col=calcWinner(board,row,col,nrow,ncol)
        if aWin:
            playing=False
            board[win_row[:],win_col[:]]=4
        else:
            isXturn=not(isXturn)
    else:
        playing=False # board is full
