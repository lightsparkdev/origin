import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Pagination } from './Pagination';

const meta: Meta = {
  title: 'Components/Pagination',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

// Interactive wrapper for controlled pagination
function PaginationDemo({
  initialPage = 1,
  totalPages = 10,
}: {
  initialPage?: number;
  totalPages?: number;
}) {
  const [page, setPage] = React.useState(initialPage);

  return (
    <Pagination.Root page={page} totalPages={totalPages} onPageChange={setPage}>
      <Pagination.Previous />
      <Pagination.Items />
      <Pagination.Next />
    </Pagination.Root>
  );
}

export const Default: StoryObj = {
  render: () => <PaginationDemo />,
};

export const FirstPage: StoryObj = {
  render: () => <PaginationDemo initialPage={1} />,
};

export const LastPage: StoryObj = {
  render: () => <PaginationDemo initialPage={10} />,
};

export const MiddlePage: StoryObj = {
  render: () => <PaginationDemo initialPage={5} />,
};

export const ManyPages: StoryObj = {
  render: () => <PaginationDemo initialPage={50} totalPages={100} />,
};

export const FewPages: StoryObj = {
  render: () => <PaginationDemo initialPage={2} totalPages={5} />,
};

export const SinglePage: StoryObj = {
  render: () => <PaginationDemo initialPage={1} totalPages={1} />,
};

export const TwoPages: StoryObj = {
  render: () => <PaginationDemo initialPage={1} totalPages={2} />,
};
