import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Form } from './Form';
import { Field } from '@/components/Field';
import { Fieldset } from '@/components/Fieldset';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';

const meta = {
  title: 'Examples/Payment Destination Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const accountTypes = [
  { value: 'clabe', label: 'CLABE', region: 'Mexico' },
  { value: 'iban', label: 'IBAN', region: 'Europe' },
  { value: 'pix', label: 'PIX', region: 'Brazil' },
  { value: 'ach', label: 'ACH', region: 'United States' },
  { value: 'swift', label: 'SWIFT/BIC', region: 'International' },
];

const balanceHistory = [
  { month: 'Aug', value: 12400 },
  { month: 'Sep', value: 15200 },
  { month: 'Oct', value: 14100 },
  { month: 'Nov', value: 18900 },
  { month: 'Dec', value: 22100 },
  { month: 'Jan', value: 24850 },
];

function BalanceChart() {
  const width = 320;
  const height = 120;
  const padding = { top: 16, right: 16, bottom: 24, left: 16 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...balanceHistory.map((d) => d.value));
  const minValue = Math.min(...balanceHistory.map((d) => d.value));
  const valueRange = maxValue - minValue;

  const points = balanceHistory.map((d, i) => {
    const x = padding.left + (i / (balanceHistory.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((d.value - minValue) / valueRange) * chartHeight;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  const areaPath = `
    ${linePath}
    L ${points[points.length - 1].x} ${padding.top + chartHeight}
    L ${points[0].x} ${padding.top + chartHeight}
    Z
  `;

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-green-500)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--color-green-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#areaGradient)" />
      <path d={linePath} fill="none" stroke="var(--color-green-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3" fill="var(--surface-base)" stroke="var(--color-green-500)" strokeWidth="2" />
          <text
            x={p.x}
            y={height - 6}
            textAnchor="middle"
            style={{
              fontSize: 'var(--font-size-2xs)',
              fill: 'var(--text-secondary)',
              fontFamily: 'var(--font-family-sans)',
            }}
          >
            {p.month}
          </text>
        </g>
      ))}
    </svg>
  );
}

function BalanceCard() {
  const currentBalance = balanceHistory[balanceHistory.length - 1].value;
  const previousBalance = balanceHistory[balanceHistory.length - 2].value;
  const change = currentBalance - previousBalance;
  const changePercent = ((change / previousBalance) * 100).toFixed(1);

  return (
    <div
      style={{
        padding: 'var(--spacing-lg)',
        background: 'var(--surface-base)',
        borderRadius: 'var(--corner-radius-md)',
        border: 'var(--stroke-sm) solid var(--border-tertiary)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 'var(--spacing-sm)',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--text-secondary)',
              marginBottom: 'var(--spacing-3xs)',
            }}
          >
            Available Balance
          </div>
          <div
            style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--text-primary)',
            }}
          >
            ${currentBalance.toLocaleString()}.00
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-3xs)',
            padding: 'var(--spacing-3xs) var(--spacing-xs)',
            background: 'var(--surface-green)',
            borderRadius: 'var(--corner-radius-round)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-green-700)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 9V3M6 3L3 6M6 3L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          +{changePercent}%
        </div>
      </div>
      <BalanceChart />
    </div>
  );
}

export const PaymentDestinationForm: Story = {
  render: function PaymentDestinationFormStory() {
    const [accountType, setAccountType] = React.useState('');
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [submitted, setSubmitted] = React.useState(false);

    const getAccountPlaceholder = () => {
      switch (accountType) {
        case 'clabe':
          return '18 digits (e.g., 012345678901234567)';
        case 'iban':
          return 'e.g., DE89370400440532013000';
        case 'pix':
          return 'CPF, CNPJ, email, phone, or random key';
        case 'ach':
          return 'Routing + Account number';
        case 'swift':
          return '8-11 characters (e.g., DEUTDEFF)';
        default:
          return 'Enter account identifier';
      }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const newErrors: Record<string, string> = {};

      if (!accountType) newErrors.accountType = 'Please select an account type';
      if (!formData.get('accountNumber')) newErrors.accountNumber = 'Account number is required';
      if (!formData.get('receiverName')) newErrors.receiverName = 'Receiver name is required';
      if (!formData.get('addressLine1')) newErrors.addressLine1 = 'Address is required';
      if (!formData.get('city')) newErrors.city = 'City is required';
      if (!formData.get('country')) newErrors.country = 'Country is required';

      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        setSubmitted(true);
      }
    };

    if (submitted) {
      return (
        <div
          style={{
            width: 400,
            padding: 'var(--spacing-xl)',
            background: 'var(--surface-green)',
            borderRadius: 'var(--corner-radius-md)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              margin: '0 auto var(--spacing-md)',
              background: 'var(--surface-green-strong)',
              borderRadius: 'var(--corner-radius-round)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-xs)' }}>
            Payment destination saved
          </div>
          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
            You can now send funds to this recipient.
          </div>
        </div>
      );
    }

    return (
      <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', padding: 4 }}>
        <BalanceCard />

        <Form onSubmit={handleSubmit} errors={errors}>
          <Fieldset.Root>
            <Fieldset.Legend>Account Information</Fieldset.Legend>

            <Field.Root invalid={!!errors.accountType}>
              <Field.Label>Account Type</Field.Label>
              <Select.Root value={accountType} onValueChange={setAccountType}>
                <Select.Trigger>
                  <Select.Value placeholder="Select account type" />
                  <Select.Icon />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Positioner>
                    <Select.Popup>
                      <Select.List>
                        {accountTypes.map((type) => (
                          <Select.Item key={type.value} value={type.value}>
                            <Select.ItemIndicator />
                            <Select.ItemText>
                              {type.label}
                              <span style={{ color: 'var(--text-secondary)', marginLeft: 'var(--spacing-xs)' }}>
                                {type.region}
                              </span>
                            </Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.List>
                    </Select.Popup>
                  </Select.Positioner>
                </Select.Portal>
              </Select.Root>
              <Field.Error>{errors.accountType}</Field.Error>
            </Field.Root>

            <Field.Root name="accountNumber" invalid={!!errors.accountNumber}>
              <Field.Label>Account Number</Field.Label>
              <Input placeholder={getAccountPlaceholder()} />
              <Field.Error>{errors.accountNumber}</Field.Error>
            </Field.Root>
          </Fieldset.Root>

          <Fieldset.Root>
            <Fieldset.Legend>Receiver Information</Fieldset.Legend>

            <Field.Root name="receiverName" invalid={!!errors.receiverName}>
              <Field.Label>Full Name</Field.Label>
              <Input placeholder="Legal name of account holder" />
              <Field.Error>{errors.receiverName}</Field.Error>
            </Field.Root>
          </Fieldset.Root>

          <Fieldset.Root>
            <Fieldset.Legend>Address</Fieldset.Legend>

            <Field.Root name="addressLine1" invalid={!!errors.addressLine1}>
              <Field.Label>Address Line 1</Field.Label>
              <Input placeholder="Street address" />
              <Field.Error>{errors.addressLine1}</Field.Error>
            </Field.Root>

            <Field.Root name="addressLine2">
              <Field.Label>Address Line 2</Field.Label>
              <Input placeholder="Apt, suite, unit, etc. (optional)" />
            </Field.Root>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
              <Field.Root name="city" invalid={!!errors.city}>
                <Field.Label>City</Field.Label>
                <Input placeholder="City" />
                <Field.Error>{errors.city}</Field.Error>
              </Field.Root>

              <Field.Root name="postalCode">
                <Field.Label>Postal Code</Field.Label>
                <Input placeholder="Postal code" />
              </Field.Root>
            </div>

            <Field.Root name="country" invalid={!!errors.country}>
              <Field.Label>Country</Field.Label>
              <Input placeholder="Country" />
              <Field.Error>{errors.country}</Field.Error>
            </Field.Root>
          </Fieldset.Root>

          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" variant="filled">
              Save Destination
            </Button>
          </div>
        </Form>
      </div>
    );
  },
};
