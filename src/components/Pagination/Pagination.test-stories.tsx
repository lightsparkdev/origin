'use client';

import * as React from 'react';
import { Pagination } from './Pagination';

// Basic pagination with multiple pages
export function BasicPagination() {
  const [page, setPage] = React.useState(1);
  return (
    <Pagination.Root
      page={page}
      totalPages={10}
      onPageChange={setPage}
    >
      <Pagination.Previous />
      <Pagination.Items />
      <Pagination.Next />
    </Pagination.Root>
  );
}

// Pagination on first page (Previous disabled)
export function FirstPage() {
  return (
    <Pagination.Root page={1} totalPages={10}>
      <Pagination.Previous />
      <Pagination.Items />
      <Pagination.Next />
    </Pagination.Root>
  );
}

// Pagination on last page (Next disabled)
export function LastPage() {
  return (
    <Pagination.Root page={10} totalPages={10}>
      <Pagination.Previous />
      <Pagination.Items />
      <Pagination.Next />
    </Pagination.Root>
  );
}

// Pagination with many pages (shows ellipsis)
export function ManyPages() {
  return (
    <Pagination.Root page={50} totalPages={100}>
      <Pagination.Previous />
      <Pagination.Items />
      <Pagination.Next />
    </Pagination.Root>
  );
}

// Pagination with few pages (no ellipsis)
export function FewPages() {
  return (
    <Pagination.Root page={2} totalPages={5}>
      <Pagination.Previous />
      <Pagination.Items />
      <Pagination.Next />
    </Pagination.Root>
  );
}

// Single page (both nav buttons disabled)
export function SinglePage() {
  return (
    <Pagination.Root page={1} totalPages={1}>
      <Pagination.Previous />
      <Pagination.Items />
      <Pagination.Next />
    </Pagination.Root>
  );
}

// Controlled pagination
export function ControlledPagination() {
  const [page, setPage] = React.useState(5);
  return (
    <div>
      <Pagination.Root page={page} totalPages={10} onPageChange={setPage}>
        <Pagination.Previous />
        <Pagination.Items />
        <Pagination.Next />
      </Pagination.Root>
      <p data-testid="current-page">Current page: {page}</p>
    </div>
  );
}
