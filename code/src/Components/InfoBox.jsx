import {React,useState} from 'react'
const InfoBox = () => {
  const [isVisible, setIsVisible] = useState(true);
  //Function to dismiss the info alert box
  const handleDismiss = () => {
    setIsVisible(false);
  };
  return (
    <div style={{ marginTop: '5rem' }}>
        {isVisible && (
            <div id="alert-additional-content-4" className="p-4 m-5 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800" role="alert">
                <div className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <h3 className="text-lg font-medium">Info</h3>
                </div>
                <div className="mt-2 mb-4 text-sm">
                <ul class="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                    <li>
                        You can move the Origin and Destination anywhere within the Grid.
                    </li>
                    <li>
                        You can create <b>Walls</b> by Left-Clicking in the Grid.
                    </li>
                    <li>
                       By Clicking on <b>Visualize BFS</b> button you can visualize the Breadth First Search Algorithm. 
                       It is an algorithm used for traversing or searching tree or graph data structures, exploring all neighbor nodes 
                       at the present depth before moving on to nodes at the next depth level. It employs a queue to keep track of the nodes to be explored, 
                       ensuring that the shortest path in an unweighted graph is found.
                    </li>
                    <li>
                       By Clicking the <b>Visualize DFS</b> button you can visualize the Depth First Search Algorithm. 
                       DFS is a graph traversal algorithm that explores as far along a branch as possible before backtracking, 
                       which can be implemented using a stack (either explicitly or via recursion). 
                       This approach is particularly useful for exploring paths and generating maze-like structures, 
                       though it may not find the shortest path in weighted graphs.
                    </li>
                    <li>
                        By Clicking the <b>Visualize Dijkstra's Algorithm </b> button you can visualize the Dijkstra's Algorithm.
                        It is a popular method for finding the shortest paths from a source node to the destination node in a weighted graph with non-negative edge weights. 
                    </li>
                    <li>
                        You can use the <b>Refresh</b> Button to refresh the grid.
                    </li>
                </ul>
                </div>
                <div className="flex">
                    <button 
                        type="button" 
                        className="text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800"
                        aria-label="Close"
                        onClick={handleDismiss}>
                    Dismiss
                    </button>
                </div>
            </div>
        )}
    </div>
  )
}
export default InfoBox
