export const BageNewMessages = ({ show }: { show: boolean }) => {
  return (<>
        { show && 
            <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                <span className="visually-hidden">Новые сообщения</span>
            </span> 
        }
    </>);
};