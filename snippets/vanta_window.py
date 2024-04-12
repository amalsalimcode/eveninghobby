

class Employee:
	def __init__(self, start_day, training_taken) -> None:
		self.start_day = start_day
		self.training_taken = training_taken

	def __str__(self) -> str:
		return str(self.__dict__)
		

class Status:
	def __init__(self, status) -> None:

		if status not in ["completed", "not required", "pending", "overdue"]:
			raise Exception ("in valid status")

		self.status = status


def get_status(emp, check_date=None, window=None):

	if check_date > emp.training_taken:
		return Status("completed")


	if check_date < emp.start_day:
		return Status("not required")


	due = check_date - emp.start_date + window
	return Status("pending", 0) if due < 0 else Status("overdue", due)


