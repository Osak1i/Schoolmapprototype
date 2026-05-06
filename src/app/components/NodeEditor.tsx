import { useState } from 'react';
import { Node } from '../types/map';
import { Download, Copy, Trash2, Move, Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { getTranslation, Language } from '../utils/translations';

interface NodeEditorProps {
  nodes: Node[];
  onNodesChange: (nodes: Node[]) => void;
  currentBuilding: string;
  currentFloor: number;
  language: Language;
  onClose: () => void;
}

export function NodeEditor({
  nodes,
  onNodesChange,
  currentBuilding,
  currentFloor,
  language,
  onClose
}: NodeEditorProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [editingNode, setEditingNode] = useState<Node | null>(null);

  const currentNodes = nodes.filter(
    n => n.building === currentBuilding && n.floor === currentFloor
  );

  const handleDeleteNode = (nodeId: string) => {
    if (confirm('Delete this node?')) {
      onNodesChange(nodes.filter(n => n.id !== nodeId));
      setSelectedNodeId(null);
      setEditingNode(null);
    }
  };

  const handleUpdateNode = (updatedNode: Node) => {
    const updatedNodes = nodes.map(n =>
      n.id === updatedNode.id ? updatedNode : n
    );
    onNodesChange(updatedNodes);
    setEditingNode(null);
  };

  const handleExportNodes = () => {
    const nodeData = currentNodes.map(node => ({
      id: node.id,
      x: Math.round(node.x),
      y: Math.round(node.y),
      building: node.building,
      floor: node.floor,
      ...(node.roomId && { roomId: node.roomId })
    }));

    const exportText = `// Nodes for ${currentBuilding} - Floor ${currentFloor}\n` +
      JSON.stringify(nodeData, null, 2);

    navigator.clipboard.writeText(exportText);
    alert('Nodes copied to clipboard!');
  };

  const handleExportAsCode = () => {
    const nodeCode = currentNodes.map(node => {
      const roomPart = node.roomId ? `, roomId: '${node.roomId}'` : '';
      return `  { id: '${node.id}', x: ${Math.round(node.x)}, y: ${Math.round(node.y)}, building: '${node.building}', floor: ${node.floor}${roomPart} },`;
    }).join('\n');

    const fullCode = `// Export for ${currentBuilding} - Floor ${currentFloor}\nexport const nodes: Node[] = [\n${nodeCode}\n];`;

    navigator.clipboard.writeText(fullCode);
    alert('Node code copied to clipboard!');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-[#A82227] shadow-2xl z-30 max-h-[40vh] overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#A82227] p-2 rounded-lg">
              <Move className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#A82227]">Node Editor Mode</h3>
              <p className="text-xs text-gray-600">
                {currentBuilding.toUpperCase()} - Floor {currentFloor} | {currentNodes.length} nodes
              </p>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <Button
            onClick={handleExportNodes}
            className="bg-[#A82227] hover:bg-[#8B1C20] text-white"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy as JSON
          </Button>
          <Button
            onClick={handleExportAsCode}
            className="bg-[#A5968A] hover:bg-[#8B7E73] text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Copy as Code
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-2 border-[#A5968A] text-[#A82227]"
          >
            <X className="h-4 w-4 mr-2" />
            Exit Editor
          </Button>
        </div>

        {/* Instructions */}
        <div className="bg-[#FCE8E9] p-3 rounded-lg mb-3">
          <p className="text-sm font-semibold text-[#A82227] mb-1">Instructions:</p>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>• Click on the map to add a new node</li>
            <li>• Drag existing nodes to reposition them</li>
            <li>• Click a node to select and edit it</li>
            <li>• Use export buttons to save your changes</li>
          </ul>
        </div>

        {/* Node List */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-700">Current Nodes:</h4>
          <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
            {currentNodes.map(node => (
              <div
                key={node.id}
                className={`flex items-center justify-between p-2 rounded-lg border-2 transition-all ${
                  selectedNodeId === node.id
                    ? 'bg-[#FCE8E9] border-[#A82227]'
                    : 'bg-gray-50 border-gray-200 hover:border-[#A5968A]'
                }`}
              >
                <div className="flex-1">
                  <p className="font-mono text-xs font-semibold">{node.id}</p>
                  <p className="text-xs text-gray-600">
                    x: {Math.round(node.x)}, y: {Math.round(node.y)}
                    {node.roomId && ` | Room: ${node.roomId}`}
                  </p>
                </div>
                <Button
                  onClick={() => handleDeleteNode(node.id)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-600 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Node Dialog */}
        {editingNode && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="font-bold text-lg mb-4">Edit Node</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">Node ID</label>
                  <input
                    type="text"
                    value={editingNode.id}
                    onChange={(e) => setEditingNode({ ...editingNode, id: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Room ID (optional)</label>
                  <input
                    type="text"
                    value={editingNode.roomId || ''}
                    onChange={(e) => setEditingNode({ ...editingNode, roomId: e.target.value || undefined })}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg"
                    placeholder="Leave empty for hallway nodes"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleUpdateNode(editingNode)}
                    className="flex-1 bg-[#A82227] hover:bg-[#8B1C20]"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditingNode(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
