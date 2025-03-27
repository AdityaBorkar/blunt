'use server';

export async function $task_create(formData: FormData) {
	const title = formData.get('title');
	const description = formData.get('description');
	const completed = formData.get('completed');
}

export async function $task_delete(formData: FormData) {
	const id = formData.get('id');
}

export async function $task_markAsCompleted(id: string) {
	// ...
}

export async function $task_update(formData: FormData) {
	const id = formData.get('id');
}
