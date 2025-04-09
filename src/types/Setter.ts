import { Dispatch, SetStateAction } from "react";

type Setter<T> = Dispatch<SetStateAction<T>>;

export default Setter;
