"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabItem {
  name: string;
  value: string;
  content: React.ReactNode;
}

interface ReusableTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  className?: string; // optional extra class for wrapper
}

const CustomTabs: React.FC<ReusableTabsProps> = ({ tabs, defaultValue, className }) => {
  return (
    <div className={`w-full ${className || ''}`}>
      <Tabs defaultValue={defaultValue || tabs[0]?.value} className='gap-4'>
        <TabsList className='bg-background rounded-none border-b p-0'>
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none'
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            <p className='text-muted-foreground text-sm'>{tab.content}</p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CustomTabs;
