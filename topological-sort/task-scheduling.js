/**
There are ‘N’ tasks, labeled from ‘0’ to ‘N-1’. Each task can have some prerequisite tasks which need to be completed before it can be scheduled. 
Given the number of tasks and a list of prerequisite pairs, find out if it is possible to schedule all the tasks.

Example 1:

Input: Tasks=3, Prerequisites=[0, 1], [1, 2]
Output: true
Explanation: To execute task '1', task '0' needs to finish first. Similarly, task '1' needs to finish 
before '2' can be scheduled. A possible sceduling of tasks is: [0, 1, 2] 
Example 2:

Input: Tasks=3, Prerequisites=[0, 1], [1, 2], [2, 0]
Output: false
Explanation: The tasks have cyclic dependency, therefore they cannot be sceduled.
Example 3:

Input: Tasks=6, Prerequisites=[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]
Output: true
Explanation: A possible sceduling of tasks is: [0 1 4 3 2 5] 

**/

const Deque = require('./collections/deque'); //http://www.collectionsjs.com


function is_scheduling_possible(tasks, prerequisites) {
  const sortedOrder = [];
  if (tasks <= 0) {
    return false;
  }

  // a. Initialize the graph
  const inDegree = Array(tasks).fill(0); // count of incoming edges
  const graph = Array(tasks).fill(0).map(() => Array()); // adjacency list graph

  // b. Build the graph
  prerequisites.forEach((prerequisite) => {
    let parent = prerequisite[0],
      child = prerequisite[1];
    graph[parent].push(child); // put the child into it's parent's list
    inDegree[child]++; // increment child's inDegree
  });


  // c. Find all sources i.e., all vertices with 0 in-degrees
  const sources = new Deque();
  for (i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) {
      sources.push(i);
    }
  }

  // d. For each source, add it to the sortedOrder and subtract one from all of its children's in-degrees
  // if a child's in-degree becomes zero, add it to the sources queue
  while (sources.length > 0) {
    const vertex = sources.shift();
    sortedOrder.push(vertex);
    graph[vertex].forEach((child) => { // get the node's children to decrement their in-degrees
      inDegree[child] -= 1;
      if (inDegree[child] === 0) {
        sources.push(child);
      }
    });
  }


  // if sortedOrder doesn't contain all tasks, there is a cyclic dependency between tasks, therefore, we
  // will not be able to schedule all tasks
  return sortedOrder.length === tasks;
}

console.log(`Is scheduling possible: ${
  is_scheduling_possible(3, [
    [0, 1],
    [1, 2],
  ])}`);
console.log(`Is scheduling possible: ${
  is_scheduling_possible(3, [
    [0, 1],
    [1, 2],
    [2, 0],
  ])}`);
console.log(`Is scheduling possible: ${
  is_scheduling_possible(6, [
    [0, 4],
    [1, 4],
    [3, 2],
    [1, 3],
  ])}`);
