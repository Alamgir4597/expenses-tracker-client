import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppPagination from "../../components/AppPagination";
import ContentDetails from "../../components/ContentDetails";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import LoadingComponent from "../../components/Loading";
import { fetchAllExpAction } from "../../redux/slices/expenses/expensesSlices";

const ExpensesList = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    //get expenses from store
    const expenses = useSelector(state => state.expenses);
    const { loading, appErr, serverErr, expenseList } = expenses;
    //fetch expenses
    useEffect(() => {
        dispatch(fetchAllExpAction(+page));
    }, [dispatch, page, setPage]);
    return (
        <>
            {loading ? (
                <LoadingComponent />
            ) : appErr || serverErr ? (
                <ErrorDisplayMessage>
                    {serverErr} {appErr}
                </ErrorDisplayMessage>
            ) : (
                <section className="py-6">
                    <div className="container-fluid">
                        <div className="position-relative border rounded-2">
                            <a
                                className="position-absolute top-0 end-0 mt-4 me-4"
                                href="#"
                            ></a>
                            <div className="pt-8 px-8 mb-8">
                                <h6 className="mb-0 fs-3">Recent Expense transactions</h6>
                                <p className="mb-0">
                                    Below is the history of your expense transactions records
                                </p>
                                <Link to="/" className="btn  btn-outline-danger me-2 m-2">
                                    New Expense
                                </Link>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr className="table-active">
                                        <th scope="col">
                                            <button className="btn d-flex align-items-centerr text-uppercase">
                                                <small>Withdrawed By</small>
                                            </button>
                                        </th>
                                        <th scope="col">
                                            <button className="btn d-flex align-items-centerr text-uppercase">
                                                <small>Title</small>
                                            </button>
                                        </th>
                                        <th scope="col">
                                            <button className="btn d-flex align-items-centerr text-uppercase">
                                                <small>Description</small>
                                            </button>
                                        </th>
                                        <th scope="col">
                                            <button className="btn d-flex align-items-centerr text-uppercase">
                                                <small>Amount</small>
                                            </button>
                                        </th>
                                        <th scope="col">
                                            <button className="btn d-flex align-items-centerr text-uppercase">
                                                <small>Date</small>
                                            </button>
                                        </th>
                                        <th scope="col">
                                            <button className="btn d-flex align-items-centerr text-uppercase">
                                                <small>Action</small>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <h1>Loading...</h1>
                                    ) : appErr || serverErr ? (
                                        <div>err</div>
                                    ) : expenseList?.docs?.length <= 0 ? (
                                        <h1>No Expense Found</h1>
                                    ) : (
                                        expenseList?.docs?.map(exp => (
                                            <>
                                                <ContentDetails key={exp?._id} item={exp} />
                                            </>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "20px",
                        }}
                    >
                        <AppPagination
                            setPage={setPage}
                            pageNumber={expenseList?.totalPages}
                        />
                    </div>
                </section>
            )}
        </>
    );
};

export default ExpensesList;