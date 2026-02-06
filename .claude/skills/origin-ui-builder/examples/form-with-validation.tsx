import React, { useState } from 'react';
import {
  Button,
  Field,
  Fieldset,
  Input,
  Select,
  Checkbox,
  Radio,
} from '@grid/origin';
import styles from './form-with-validation.module.scss';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  plan: string;
  notifications: string[];
  agreeToTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  plan?: string;
  agreeToTerms?: string;
}

const COUNTRIES = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
];

const PLANS = [
  { value: 'basic', label: 'Basic', description: '$9/month - For individuals' },
  { value: 'pro', label: 'Pro', description: '$29/month - For small teams' },
  { value: 'enterprise', label: 'Enterprise', description: 'Custom pricing' },
];

const NOTIFICATION_OPTIONS = [
  { value: 'email', label: 'Email notifications' },
  { value: 'sms', label: 'SMS notifications' },
  { value: 'push', label: 'Push notifications' },
];

function validateEmail(email: string): string | undefined {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please enter a valid email address';
  }
}

function validateRequired(value: string, fieldName: string): string | undefined {
  if (!value || !value.trim()) {
    return `${fieldName} is required`;
  }
}

export function FormWithValidation() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    plan: 'basic',
    notifications: ['email'],
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    newErrors.firstName = validateRequired(formData.firstName, 'First name');
    newErrors.lastName = validateRequired(formData.lastName, 'Last name');
    newErrors.email = validateEmail(formData.email);
    newErrors.country = validateRequired(formData.country, 'Country');

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }

    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([, v]) => v !== undefined)
    ) as FormErrors;

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className={styles.successMessage}>
        <h2>Registration Complete</h2>
        <p>Thank you for registering, {formData.firstName}!</p>
        <Button onClick={() => setIsSubmitted(false)}>Start Over</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Fieldset.Root>
        <Fieldset.Legend>Personal Information</Fieldset.Legend>
        <Fieldset.Description>
          Please provide your contact details.
        </Fieldset.Description>

        <div className={styles.row}>
          <Field.Root data-invalid={!!errors.firstName}>
            <Field.Label>First Name</Field.Label>
            <Input
              value={formData.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
              placeholder="John"
              data-invalid={!!errors.firstName}
            />
            {errors.firstName && <Field.Error>{errors.firstName}</Field.Error>}
          </Field.Root>

          <Field.Root data-invalid={!!errors.lastName}>
            <Field.Label>Last Name</Field.Label>
            <Input
              value={formData.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
              placeholder="Doe"
              data-invalid={!!errors.lastName}
            />
            {errors.lastName && <Field.Error>{errors.lastName}</Field.Error>}
          </Field.Root>
        </div>

        <Field.Root data-invalid={!!errors.email}>
          <Field.Label>Email Address</Field.Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="john@example.com"
            data-invalid={!!errors.email}
          />
          <Field.Description>
            We'll use this for account notifications.
          </Field.Description>
          {errors.email && <Field.Error>{errors.email}</Field.Error>}
        </Field.Root>

        <Field.Root>
          <Field.Label>Phone Number (optional)</Field.Label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </Field.Root>

        <Field.Root data-invalid={!!errors.country}>
          <Field.Label>Country</Field.Label>
          <Select.Root
            value={formData.country}
            onValueChange={(value) => updateField('country', value)}
          >
            <Select.Trigger data-invalid={!!errors.country}>
              <Select.Value placeholder="Select your country" />
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.List>
                    {COUNTRIES.map((country) => (
                      <Select.Item key={country.value} value={country.value}>
                        {country.label}
                      </Select.Item>
                    ))}
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
          {errors.country && <Field.Error>{errors.country}</Field.Error>}
        </Field.Root>
      </Fieldset.Root>

      <Fieldset.Root>
        <Fieldset.Legend>Subscription Plan</Fieldset.Legend>
        <Fieldset.Description>
          Choose the plan that best fits your needs.
        </Fieldset.Description>

        <Radio.Group
          value={formData.plan}
          onValueChange={(value) => updateField('plan', value)}
        >
          {PLANS.map((plan) => (
            <Radio.Item
              key={plan.value}
              value={plan.value}
              label={plan.label}
              description={plan.description}
            />
          ))}
        </Radio.Group>
      </Fieldset.Root>

      <Fieldset.Root>
        <Fieldset.Legend>Notification Preferences</Fieldset.Legend>
        <Fieldset.Description>
          How would you like to receive updates?
        </Fieldset.Description>

        <Checkbox.Group
          value={formData.notifications}
          onValueChange={(value) => updateField('notifications', value)}
        >
          {NOTIFICATION_OPTIONS.map((option) => (
            <Checkbox.Item
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </Checkbox.Group>
      </Fieldset.Root>

      <div className={styles.terms}>
        <Checkbox.Item
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) =>
            updateField('agreeToTerms', checked === true)
          }
          label="I agree to the Terms of Service and Privacy Policy"
          data-invalid={!!errors.agreeToTerms}
        />
        {errors.agreeToTerms && (
          <span className={styles.termsError}>{errors.agreeToTerms}</span>
        )}
      </div>

      <div className={styles.actions}>
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>
    </form>
  );
}

export default FormWithValidation;
