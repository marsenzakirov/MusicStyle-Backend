import { BadRequestException } from './exceptions';

export const checkDto = (dto: any) => {
  const keys = Object.keys(dto);
  for (const key of keys) {
    if (!dto[key]) {
      throw new BadRequestException({ message: `${key} is required` });
    }
  }
};

export const checkIsExist = (data: any) => {
  if (!data) {
    throw new BadRequestException({ message: 'Data is not exist' });
  }
};
