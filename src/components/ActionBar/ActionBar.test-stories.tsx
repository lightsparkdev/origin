'use client';

import * as React from 'react';
import { ActionBar, ActionBarLabel, ActionBarActions } from './ActionBar';
import { Button } from '@/components/Button';

export function DefaultActionBar() {
  return (
    <ActionBar data-testid="action-bar">
      <ActionBarLabel data-testid="action-bar-label">4 transactions selected</ActionBarLabel>
      <ActionBarActions>
        <Button variant="outline" size="md">
          Clear
        </Button>
        <Button variant="filled" size="md">
          Export
        </Button>
      </ActionBarActions>
    </ActionBar>
  );
}

export function ActionBarWithCallbacks() {
  const [cleared, setCleared] = React.useState(false);
  const [exported, setExported] = React.useState(false);

  return (
    <>
      <ActionBar data-testid="action-bar">
        <ActionBarLabel>4 transactions selected</ActionBarLabel>
        <ActionBarActions>
          <Button variant="outline" size="md" onClick={() => setCleared(true)}>
            Clear
          </Button>
          <Button variant="filled" size="md" onClick={() => setExported(true)}>
            Export
          </Button>
        </ActionBarActions>
      </ActionBar>
      {cleared && <div data-testid="cleared">Cleared</div>}
      {exported && <div data-testid="exported">Exported</div>}
    </>
  );
}

export function ActionBarSingleButton() {
  return (
    <ActionBar data-testid="action-bar">
      <ActionBarLabel>2 items selected</ActionBarLabel>
      <ActionBarActions>
        <Button variant="filled" size="md">
          Delete
        </Button>
      </ActionBarActions>
    </ActionBar>
  );
}

export function ActionBarCustomClassName() {
  return (
    <ActionBar data-testid="action-bar" className="custom-class">
      <ActionBarLabel className="custom-label-class">Test label</ActionBarLabel>
      <ActionBarActions className="custom-actions-class">
        <Button variant="filled" size="md">
          Action
        </Button>
      </ActionBarActions>
    </ActionBar>
  );
}
