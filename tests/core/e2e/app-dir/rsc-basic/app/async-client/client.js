'use client';

import { useState } from 'react';

const name = await Promise.resolve('async');

export default (_props) => {
	return `client ${useState(name)[0]}`;
};
