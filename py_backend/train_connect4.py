from numpy import *
from matplotlib.pyplot import *
from calcWinner import calcWinner
def pickMove(isXturn,board):
    openCol=(board[0,:]==0).nonzero()[0]
    if openCol.size==0:
        col=nan
        row=nan
    else:
        one_move=copy(board)
        weight=random.rand(openCol.size)
        #weight based on board is a natural place to intoduce ML
        if isXturn:
            me=5
            op=10
        else:
            me=10
            op=5
        for consider,col in enumerate(openCol):
            row=sum(board[:,col]==0)-1
            one_move[row,col]=me
            aWin,win_row,win_col=calcWinner(one_move,row,col,nrow,ncol)
            one_move[row,col]=0
            if aWin:
                return row,col
        for consider,col in enumerate(openCol):
            row=sum(board[:,col]==0)-1
            one_move[row,col]=op
            aWin,win_row,win_col=calcWinner(one_move,row,col,nrow,ncol)
            one_move[row,col]=0
            if aWin:
                return row,col
        bestMove=argmax(weight)
        col=openCol[bestMove]
        row=sum(board[:,col]==0)-1
    return row,col

#if __name__=='_main_':
ion()
plt_x=tile(atleast_2d(arange(ncol+1))  ,[nrow+1,1])-.5
plt_y=tile(atleast_2d(arange(nrow+1)).T,[1,ncol+1])-.5
nrow=6
ncol=7
isXturn=True
playing=True
board=tile([0],[nrow,ncol])
while playing:
    row,col=pickMove(isXturn,board)
    if isfinite(row):
        if isXturn:
            board[row,col]=5
            win_val=4
        else:
            board[row,col]=10
            win_val=9
        aWin,win_row,win_col=calcWinner(board,row,col,nrow,ncol)
        if aWin:
            playing=False
            board[win_row[:],win_col[:]]=win_val
        else:
            isXturn=not(isXturn)
    else:
        playing=False # board is full
    clf()
    imshow(board,clim=[0,10])
    plot(plt_x  ,plt_y  ,'-w')
    plot(plt_x.T,plt_y.T,'-w')
    pause(1)






