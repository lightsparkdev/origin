import React, { useState, useMemo } from 'react';
import {
  Table,
  Button,
  Badge,
  Input,
  Select,
  Pagination,
  Menu,
  Checkbox,
  CentralIcon,
} from '@grid/origin';
import styles from './data-table.module.scss';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'editor',
    status: 'active',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    role: 'viewer',
    status: 'inactive',
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@example.com',
    role: 'editor',
    status: 'pending',
    createdAt: '2024-04-05',
  },
  {
    id: '5',
    name: 'Eva Martinez',
    email: 'eva@example.com',
    role: 'viewer',
    status: 'active',
    createdAt: '2024-05-12',
  },
];

type SortField = 'name' | 'email' | 'role' | 'status' | 'createdAt';
type SortDirection = 'asc' | 'desc';

const STATUS_COLORS: Record<User['status'], 'green' | 'gray' | 'yellow'> = {
  active: 'green',
  inactive: 'gray',
  pending: 'yellow',
};

const ROLE_LABELS: Record<User['role'], string> = {
  admin: 'Administrator',
  editor: 'Editor',
  viewer: 'Viewer',
};

const PAGE_SIZE = 10;

export function DataTable() {
  const [users] = useState<User[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, statusFilter]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortField, sortDirection]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedUsers.slice(start, start + PAGE_SIZE);
  }, [sortedUsers, currentPage]);

  const totalPages = Math.ceil(sortedUsers.length / PAGE_SIZE);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedUsers.map((u) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const allSelected =
    paginatedUsers.length > 0 &&
    paginatedUsers.every((u) => selectedIds.includes(u.id));

  const someSelected =
    paginatedUsers.some((u) => selectedIds.includes(u.id)) && !allSelected;

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return (
      <CentralIcon
        name={sortDirection === 'asc' ? 'chevron-up' : 'chevron-down'}
        size={14}
      />
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.search}>
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filters}>
          <Select.Root value={statusFilter} onValueChange={setStatusFilter}>
            <Select.Trigger>
              <Select.Value placeholder="Filter by status" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.List>
                    <Select.Item value="all">All Statuses</Select.Item>
                    <Select.Item value="active">Active</Select.Item>
                    <Select.Item value="inactive">Inactive</Select.Item>
                    <Select.Item value="pending">Pending</Select.Item>
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>

          {selectedIds.length > 0 && (
            <Button variant="outline" size="compact">
              {selectedIds.length} selected
            </Button>
          )}
        </div>
      </div>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className={styles.checkboxCell}>
              <Checkbox.Item
                checked={allSelected}
                indeterminate={someSelected}
                onCheckedChange={handleSelectAll}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <button
                className={styles.sortButton}
                onClick={() => handleSort('name')}
              >
                Name <SortIcon field="name" />
              </button>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <button
                className={styles.sortButton}
                onClick={() => handleSort('email')}
              >
                Email <SortIcon field="email" />
              </button>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <button
                className={styles.sortButton}
                onClick={() => handleSort('role')}
              >
                Role <SortIcon field="role" />
              </button>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <button
                className={styles.sortButton}
                onClick={() => handleSort('status')}
              >
                Status <SortIcon field="status" />
              </button>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <button
                className={styles.sortButton}
                onClick={() => handleSort('createdAt')}
              >
                Created <SortIcon field="createdAt" />
              </button>
            </Table.HeaderCell>
            <Table.HeaderCell className={styles.actionsCell}>
              Actions
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedUsers.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell className={styles.checkboxCell}>
                <Checkbox.Item
                  checked={selectedIds.includes(user.id)}
                  onCheckedChange={(checked) =>
                    handleSelectOne(user.id, checked === true)
                  }
                />
              </Table.Cell>
              <Table.Cell className={styles.nameCell}>
                <span className={styles.name}>{user.name}</span>
              </Table.Cell>
              <Table.Cell className={styles.emailCell}>{user.email}</Table.Cell>
              <Table.Cell>{ROLE_LABELS[user.role]}</Table.Cell>
              <Table.Cell>
                <Badge variant={STATUS_COLORS[user.status]}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                {new Date(user.createdAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell className={styles.actionsCell}>
                <Menu.Root>
                  <Menu.Trigger>
                    <Button variant="ghost" size="compact" iconOnly>
                      <CentralIcon name="more-horizontal" size={16} />
                    </Button>
                  </Menu.Trigger>
                  <Menu.Portal>
                    <Menu.Positioner>
                      <Menu.Popup>
                        <Menu.Item onSelect={() => {}}>
                          <CentralIcon name="edit" size={16} />
                          Edit
                        </Menu.Item>
                        <Menu.Item onSelect={() => {}}>
                          <CentralIcon name="copy" size={16} />
                          Duplicate
                        </Menu.Item>
                        <Menu.Separator />
                        <Menu.Item onSelect={() => {}}>
                          <CentralIcon name="trash" size={16} />
                          Delete
                        </Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {paginatedUsers.length === 0 && (
        <div className={styles.emptyState}>
          <p>No users found matching your criteria.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <span className={styles.paginationInfo}>
            Showing {(currentPage - 1) * PAGE_SIZE + 1} to{' '}
            {Math.min(currentPage * PAGE_SIZE, sortedUsers.length)} of{' '}
            {sortedUsers.length} users
          </span>
          <Pagination.Root
            page={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
          >
            <Pagination.Prev />
            <Pagination.Pages />
            <Pagination.Next />
          </Pagination.Root>
        </div>
      )}
    </div>
  );
}

export default DataTable;
