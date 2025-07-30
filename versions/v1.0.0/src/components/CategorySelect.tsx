import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category } from '@/types/globe';

interface CategorySelectProps {
  value: Category | undefined;
  onValueChange: (value: Category) => void;
  disabled?: boolean;
}

export const CategorySelect = ({ value, onValueChange, disabled }: CategorySelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-48 bg-globe-surface border-globe-border-subtle">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent className="bg-globe-surface border-globe-border-subtle">
        <SelectItem value="Shipments">📦 Shipments</SelectItem>
        <SelectItem value="Payments">💳 Payments</SelectItem>
        <SelectItem value="Configuration">⚙️ Configuration</SelectItem>
      </SelectContent>
    </Select>
  );
};