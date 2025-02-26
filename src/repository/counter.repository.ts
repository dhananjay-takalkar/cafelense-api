import Counter from '../model/counter.mode';

const getCounter = async (name: any, cafe_id: any) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name, cafe_id },
      { $inc: { count: 1 } },
      { new: true, upsert: true },
    );
    return {success: true, data: counter};
  } catch (error: any) {
    throw {success: false, message: error.message};
  }
};

const createCounter = async (name: any, cafe_id: any) => {
  try {
    const counter = await Counter.create({ name, count: 1, cafe_id });
    return {success: true, data: counter};
  } catch (error: any) {
    throw {success: false, message: error.message};
  }
};

const updateCounter = async (name: any, cafe_id: any, count: any) => {
  try {
    const counter = await Counter.findOneAndUpdate({ name, cafe_id }, { count }, { new: true });
    return {success: true, data: counter};
  } catch (error: any) {
    throw {success: false, message: error.message};
  }
};

export { getCounter, createCounter, updateCounter };
