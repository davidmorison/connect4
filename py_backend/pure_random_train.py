from numpy import *
from matplotlib.pyplot import *
from calcWinner import calcWinner
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
