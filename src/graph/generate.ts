import { Graph } from "./graph";

type EndCondition = (graph: Graph) => boolean;

export function generateGraphErdosRenyi(
  nodeCount: number,
  edgeProbability: number,
  endCondition?: EndCondition
): Graph {
  const graph = new Graph(nodeCount);

  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      if (Math.random() < edgeProbability) {
        graph.addEdge(i, j);
      }
      if (endCondition && endCondition(graph)) {
        return graph;
      }
    }
  }

  return graph;
}

export function checkConnected(graph: Graph): boolean {
  if (graph.getNode(0) === undefined) return false;

  const visited = new Set<number>();
  const stack: number[] = [0];

  while (stack.length > 0) {
    const nodeId = stack.pop()!;
    if (!visited.has(nodeId)) {
      visited.add(nodeId);
      const neighbors = graph.getNeighbors(nodeId);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor.id)) {
          stack.push(neighbor.id);
        }
      }
    }
  }

  return visited.size === graph["nodes"].size;
}
