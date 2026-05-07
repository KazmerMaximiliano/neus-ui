---
name: neus-flow-kanban
description: |
  Generates a kanban board with columns and task cards using Neus UI Card, Button, and Dropdown.
  Produces a .tsx component with configurable columns and task card structure.
  Use whenever the user asks for: "kanban", "tablero de tareas", "sprint board", "kanban board",
  "tablero kanban", "task board", "board de proyectos", "gestión de tareas visual".
  Always use for any visual task or project management board in a Neus UI project.
od:
  mode: prototype
  platform: desktop
  scenario: design
  design_system:
    requires: true
  inputs:
    - name: board_name
      type: string
      required: true
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Kanban board for project management with columns: Pending, In progress, Review, Done"
---

# Neus Flow Kanban

Generates a kanban board with columns and task cards.

## Before starting

Read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — Card, Button, Dropdown, Actions sections
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates

## Phase 0 — Collect Data

Ask in free text:
1. Board name
2. Columns (exact names — do not add extras, e.g.: "Pending, In progress, Done")
3. Task card fields (title, assignee, priority, due date — exact)
4. Card actions? (move to column, edit, delete)
5. API data? (yes → typed props; no → mock for demo)
6. Uses AppTemplate? (yes/no)

## Phase 1 — P0 Verification

- [ ] Output columns == intake columns
- [ ] Task card fields == intake
- [ ] Tasks as typed props if API-driven

## Phase 2 — Generate

Produce **three files** in this order: `KanbanBoard.types.ts` → `KanbanBoard.tsx` → `KanbanBoard.styles.css`.

### KanbanBoard.types.ts

```ts
export type TaskCard = {
  id: number;
  title: string;
  // ...exact fields from intake
  status: 'pending' | 'in_progress' | 'review' | 'done'; // match columns from intake
};

export type KanbanBoardProps = {
  tasks: TaskCard[];
  onMoveTask?: (taskId: number, newStatus: TaskCard['status']) => void;
  onEditTask?: (task: TaskCard) => void;
  onDeleteTask?: (taskId: number) => void;
  onAddTask?: (status: TaskCard['status']) => void;
};
```

### KanbanBoard.tsx

```tsx
import { AppTemplate, Card, Button, Dropdown } from 'neus-ui';
import { MoreVertical, Plus } from 'lucide-react';
import type { TaskCard, KanbanBoardProps } from './KanbanBoard.types';

const COLUMNS = [
  { key: 'pending', label: '[Column 1 from intake]' },
  // ...exact columns from intake
];

export const KanbanBoard = ({ tasks, onMoveTask, onEditTask, onDeleteTask }: KanbanBoardProps) => {
  const content = (
    <div className="kanban">
      <h1>[Board name from intake]</h1>
      <div className="kanban__board">
        {COLUMNS.map((col) => (
          <div key={col.key} className="kanban__column">
            <div className="kanban__column-header">
              <h3>{col.label}</h3>
              <span className="kanban__count">
                {tasks.filter((t) => t.status === col.key).length}
              </span>
            </div>
            <div className="kanban__cards">
              {tasks
                .filter((t) => t.status === col.key)
                .map((task) => (
                  <Card key={task.id} trailing={
                    <Dropdown
                      icon={MoreVertical}
                      items={[
                        { label: 'Edit', onClick: () => onEditTask?.(task) },
                        { label: 'Delete', onClick: () => onDeleteTask?.(task.id) },
                      ]}
                    />
                  }>
                    <div className="kanban__task">
                      <p className="kanban__task-title">{task.title}</p>
                      {/* Other fields from intake */}
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (routes) return <AppTemplate routes={routes}>{content}</AppTemplate>;
  return content;
};
```
