'use client';

// import { useForm } from 'formzen/rhf';
// import { schemaResolver } from 'formzen/rhf/zod';
import { useRef, useState } from 'react';
import { LuPlus, LuSave, LuTrash } from 'react-icons/lu';

import { Button } from '@/components/button';
import { schema } from '../lib/schema';
import { defaultTasks } from '../lib/store';
import {
	$task_create,
	$task_delete,
	$task_markAsCompleted,
	$task_update,
} from './action';

interface Task {
	id: number;
	title: string;
	completed: boolean;
	attachments: string[];
}

const emptyTask: Task = {
	id: 0,
	title: '',
	completed: false,
	attachments: [],
};

export default function App() {
	const TaskDialogRef = useRef<HTMLDialogElement>(null);

	const [tasks, setTasks] = useState<Task[]>(defaultTasks); // TODO: Read from Database
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);

	return (
		<div>
			<div className="max-w-sm">
				<div className="mb-8 rounded-lg bg-neutral-900 px-4 py-2 text-neutral-400 text-xs">
					<div className="mb-1 font-medium">Tip:</div>
					<ul className="list-disc pl-6">
						<li>Click on the card to edit the task.</li>
						<li>Click on the checkbox to mark the task as completed.</li>
					</ul>
				</div>

				<Button
					type="button"
					className="w-full rounded-lg bg-neutral-900 py-2 text-center hover:bg-neutral-800"
					onClick={() => {
						setSelectedTask(null);
						TaskDialogRef.current?.showModal();
					}}
				>
					<LuPlus className="inline-icon" />
					Add Task
				</Button>

				<div className="my-8 flex flex-col gap-4">
					{tasks.map((task) => {
						const openTaskDialog = () => {
							setSelectedTask(task);
							TaskDialogRef.current?.showModal();
						};
						return (
							<div
								key={task.id}
								className="flex w-full max-w-sm select-none flex-row gap-2 rounded-lg bg-neutral-900 px-4 py-2 hover:bg-neutral-800"
								onClick={openTaskDialog}
								onKeyDown={(e) => {
									if (e.key === 'Enter') openTaskDialog();
								}}
							>
								<input
									type="checkbox"
									className="peer inline-block"
									// onClick={$task_markAsCompleted}
									defaultChecked={task.completed}
									onClick={(e) => {
										e.stopPropagation();
										$task_markAsCompleted(task.id);
									}}
								/>
								<div className="transition-all peer-checked:text-neutral-600 peer-checked:italic">
									{task.title}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<dialog
				ref={TaskDialogRef}
				className="h-screen w-screen bg-transparent backdrop:h-screen backdrop:w-screen backdrop:bg-neutral-950/90 open:grid open:place-items-center"
			>
				OK
				{/* <TaskForm
					type={selectedTask ? 'update' : 'create'}
					defaultValues={selectedTask || emptyTask}
				/> */}
			</dialog>
		</div>
	);
}

export const config = {};

// Typescript Plugin
// Allow prompt

// function TaskForm({
// 	type,
// 	defaultValues,
// }: {
// 	type: 'create' | 'update';
// 	defaultValues: Task;
// }) {
// 	const { Form, isSubmitting } = useForm({
// 		schema,
// 		defaultValues,
// 		schemaResolver,
// 	});

// 	return (
// 		<Form className="mx-auto my-auto flex flex-col gap-4 rounded-lg border border-neutral-800 bg-neutral-900 px-6 py-4 text-neutral-200 shadow-lg">
// 			<input type="hidden" name="field.id" />
// 			<textarea
// 				autoComplete="off"
// 				className="resize-hide field-sizing-content w-full max-w-sm resize-y text-lg"
// 				defaultValue="Hello World, I am Aditya Borkar and you are watching a textarea."
// 			/>

// 			<div className="mt-8 flex flex-row justify-between gap-4">
// 				{type === 'create' ? (
// 					<Button
// 						type="submit"
// 						formAction={$task_create}
// 						disabled={isSubmitting}
// 					>
// 						<LuPlus className="inline-icon" />
// 						Create Task
// 					</Button>
// 				) : (
// 					<>
// 						<Button
// 							type="submit"
// 							formAction={$task_update}
// 							disabled={isSubmitting}
// 						>
// 							<LuSave className="inline-icon" />
// 							Update Task
// 						</Button>
// 						<Button
// 							type="submit"
// 							formNoValidate={true}
// 							formAction={$task_delete}
// 							disabled={isSubmitting}
// 						>
// 							<LuTrash className="inline-icon" />
// 							Delete Task
// 						</Button>
// 					</>
// 				)}
// 			</div>
// 		</Form>
// 	);
// }
