'use client';

import * as React from 'react';
import { SegmentedNav } from './';

export function DefaultSegmentedNav() {
  return (
    <SegmentedNav aria-label="Payout sections">
      <SegmentedNav.Link render={<a href="/payouts" />}>
        Overview
      </SegmentedNav.Link>
      <SegmentedNav.Link active render={<a href="/payouts/activity" />}>
        Activity
      </SegmentedNav.Link>
      <SegmentedNav.Link render={<a href="/payouts/recipients" />}>
        Recipients
      </SegmentedNav.Link>
    </SegmentedNav>
  );
}

export function PlainAnchorSegmentedNav() {
  return (
    <SegmentedNav aria-label="Balance sections">
      <SegmentedNav.Link render={<a href="/balances" />}>
        Balances
      </SegmentedNav.Link>
      <SegmentedNav.Link active render={<a href="/balances/activity" />}>
        Activity
      </SegmentedNav.Link>
    </SegmentedNav>
  );
}

export function LinkPropForwardingSegmentedNav() {
  return (
    <SegmentedNav aria-label="Forwarded props">
      <SegmentedNav.Link
        active
        render={
          <a
            href="/forwarded"
            data-testid="forwarded-link"
            data-custom="value"
            className="custom-link"
            style={{ color: 'rgb(255, 0, 0)' }}
          />
        }
      >
        Forwarded
      </SegmentedNav.Link>
    </SegmentedNav>
  );
}

export function ClickableSegmentedNav() {
  const [clicked, setClicked] = React.useState(false);

  return (
    <div>
      <SegmentedNav aria-label="Clickable sections">
        <SegmentedNav.Link
          render={
            <a
              href="/interactive"
              onClick={(event) => {
                event.preventDefault();
                setClicked(true);
              }}
            />
          }
        >
          Interactive
        </SegmentedNav.Link>
      </SegmentedNav>
      <span>{clicked ? 'Clicked' : 'Not clicked'}</span>
    </div>
  );
}
