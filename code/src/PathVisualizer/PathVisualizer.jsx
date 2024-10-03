import {React,useState,useEffect} from 'react'
import Header from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'
import InfoBox from '../Components/InfoBox.jsx'
import './PathVisualizer.css'
import { getInitialGrid } from '../Grid_helper/getInitialGrid.js'
import Node from '../Node_helper/Node.jsx'
import { dijkstra, getNodesInShortestPathOrder } from "../AlgorithmFunctions/dijkstra";
import { BFS, getNodesInPathOfBFS } from "../AlgorithmFunctions/breadthFirstSearch";
import { DFS, getNodesInPathOfDFS } from "../AlgorithmFunctions/depthFirstSearch";
import {
  getNewGridWithWallToggled,
  getNewGridWithRemovedStart,
  getNewGridWithRemovedEnd,
  getNewGridWithMovedStart,
  getNewGridWithMovedEnd,
} from "../Grid_helper/getNewGrid.js";
  const PathVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isPathFinded, setIsPathFinded] = useState(false);
  const [START_NODE_ROW, setStartNodeRow] = useState(10);
  const [START_NODE_COL, setStartNodeCol] = useState(15);
  const [END_NODE_ROW, setEndNodeRow] = useState(10);
  const [END_NODE_COL, setEndNodeCol] = useState(35);
  const [isStartPresent, setIsStartPresent] = useState(true);
  const [isEndPresent, setIsEndPresent] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    const newGrid = getInitialGrid(START_NODE_COL, START_NODE_ROW, END_NODE_COL, END_NODE_ROW);
    setGrid(newGrid);
  }, [START_NODE_COL, START_NODE_ROW, END_NODE_COL, END_NODE_ROW]);
  const handleMouseDownStart = (row, col) => {
    if (isPathFinded) return;
    const newGrid = getNewGridWithRemovedStart(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
    setIsStartPresent(false);
  };

  const handleMouseDownEnd = (row, col) => {
    if (isPathFinded) return;
    const newGrid = getNewGridWithRemovedEnd(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
    setIsEndPresent(false);
  };

  const handleMouseDown = (row, col) => {
    if (isPathFinded) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (isPathFinded) return;
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUpStart = (row, col) => {
    if (isPathFinded) return;
    const newGrid = getNewGridWithMovedStart(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(false);
    setIsStartPresent(true);
    setStartNodeCol(col);
    setStartNodeRow(row);
  };

  const handleMouseUpEnd = (row, col) => {
    if (isPathFinded) return;
    const newGrid = getNewGridWithMovedEnd(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(false);
    setIsEndPresent(true);
    setEndNodeCol(col);
    setEndNodeRow(row);
  };

  const handleMouseUp = () => {
    if (isPathFinded) return;
    setMouseIsPressed(false);
  };

  const animatePathSearching = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    setIsRunning(true);
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animatePath(nodesInShortestPathOrder);
          setIsPathFinded(true);
          setIsRunning(false);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = `node node-visited`;
      }, 10 * i);
    }
  };

  const animatePath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = `node node-shortest-path`;
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    animatePathSearching(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const visualizeBFS = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    const visitedNodesInOrder = BFS(grid, startNode, endNode);
    const nodesInPathOfBFS = getNodesInPathOfBFS(endNode);
    animatePathSearching(visitedNodesInOrder, nodesInPathOfBFS);
  };

  const visualizeDFS = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    const visitedNodesInOrder = DFS(grid, startNode, endNode);
    const nodesInPathOfDFS = getNodesInPathOfDFS(endNode);
    animatePathSearching(visitedNodesInOrder, nodesInPathOfDFS);
  };
  return (
    <>
    <Header/> 
    <InfoBox/>
    <div className='button-container'>
        {/* Refresh Button */}
        <a href='/' className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Refresh
            </span>
        </a>
        {/* bfs button */}
        <button 
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            onClick={visualizeBFS}
            disabled={isPathFinded || isRunning}>
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Visualize Breadth First Search Algorithm
              </span>
        </button>
        {/* dfs button */}
        <button 
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
            onClick={visualizeDFS}
            disabled={isPathFinded || isRunning}>
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Visualize Depth First Search Algorithm
              </span>
        </button>
    {/* Dijkstra's algorithm Button */}
        <button 
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              onClick={visualizeDijkstra}
              disabled={isPathFinded || isRunning}>
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Visualize Dijkstra's algorithm
            </span>
        </button>
    </div>
    <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div className="grid-row" key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isEnd, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isEnd={isEnd}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    isStartPresent={isStartPresent}
                    isEndPresent={isEndPresent}
                    onMouseDown={(row, col) => {
                    if (START_NODE_COL === col && START_NODE_ROW === row) {
                        handleMouseDownStart(row, col);
                      } else if (END_NODE_COL === col && END_NODE_ROW === row) {
                        handleMouseDownEnd(row, col);
                      } else {
                        handleMouseDown(row, col);
                      }
                    }}
                    onMouseEnter={(row, col) => {
                      if (isEndPresent && isStartPresent) handleMouseEnter(row, col);
                    }}
                    onMouseUp={(row, col) => {
                      if (!isStartPresent) {
                        handleMouseUpStart(row, col);
                      } else if (!isEndPresent) {
                        handleMouseUpEnd(row, col);
                      } else {
                        handleMouseUp();
                      }
                    }}
                    row={row}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    <Footer/>
    </>
)
}
export default PathVisualizer


