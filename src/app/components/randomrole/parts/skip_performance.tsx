import { classNames } from "@/app/components/randomrole/applications/random_role"
import { Switch } from '@headlessui/react'

type SkipPerformanceProps = {
    performanceSkip: boolean,
    setPerformanceSkip: (value: boolean) => void
}

export default function SkipPerformance({ performanceSkip, setPerformanceSkip }: SkipPerformanceProps) {
    return (
        <div className="w-full flex flex-row-reverse mt-2">
            <div>
            <Switch.Group as="div" className="flex items-center">
                <Switch
                    checked={performanceSkip}
                    onChange={setPerformanceSkip}
                    className={classNames(
                    performanceSkip ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                    )}
                >
                    <span
                    aria-hidden="true"
                    className={classNames(
                        performanceSkip ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                    />
                </Switch>
                <Switch.Label as="span" className="ml-3 text-sm">
                    <span className="text-gray-500 text-sm">演出スキップ</span>
                </Switch.Label>
            </Switch.Group>
            </div>
        </div>
    )
}