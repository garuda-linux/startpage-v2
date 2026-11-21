import type { SegmentedOption } from '../segmented/segmented.component';

type Label = (key: string) => string;

export const motionSegments = (label: Label): SegmentedOption<string>[] => [
  { label: label('customize.motionFull'), value: 'full' },
  { label: label('customize.motionSubtle'), value: 'subtle' },
  { label: label('customize.motionOff'), value: 'off' },
];

export const densitySegments = (label: Label): SegmentedOption<string>[] => [
  { label: label('customize.comfortable'), value: 'comfortable' },
  { label: label('customize.compact'), value: 'compact' },
];

export const logoStyleSegments = (label: Label): SegmentedOption<string>[] => [
  { label: label('customize.logoLarge'), value: 'large' },
  { label: label('customize.logoInline'), value: 'inline' },
];

export const clockSegments = (label: Label): SegmentedOption<string>[] => [
  { label: label('customize.clockCompact'), value: 'compact' },
  { label: label('customize.clockLarge'), value: 'large' },
];

export const sourceSegments = (label: Label): SegmentedOption<string>[] => [
  { label: label('customize.sourceGaruda'), value: 'garuda' },
  { label: label('customize.sourceRss'), value: 'rss' },
];
