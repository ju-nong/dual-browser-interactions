type WindowStoreState = {
    open: boolean;
    $interval: null | Timeout;
    x: number;
    y: number;
};

type WindowStoreActions = {
    setOpen: (open: boolean) => void;
    setPosition: (x: number, y: number) => void;
};

export type { WindowStoreState, WindowStoreActions };
